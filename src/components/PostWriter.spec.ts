import { mount } from '@vue/test-utils'
import { createPinia, Pinia, setActivePinia } from 'pinia';
import { describe, it, expect, beforeEach, vi} from 'vitest'
import { computed, createRenderer, defineComponent, ref } from 'vue';
import { createMemoryHistory, createRouter, Router } from 'vue-router';
import Navbar from './Navbar.vue'
import { routes } from '../router';
import { useUsers } from '../stores/users';
import UserForm from './UserForm.vue';
import PostWriter from './PostWriter.vue';
import { wrap } from 'lodash';

describe("Postwriter", () => {
  let pinia: Pinia
  let router: Router

  beforeEach(() => {
    pinia = createPinia()
    setActivePinia(pinia)
    const user = useUsers()
    user.currentUserId = "1"
    router = createRouter({
      history: createMemoryHistory(),
      routes,
    })
  })

  it("writes a post using markdown", () => {
    return new Promise<void> (async (resolve) => {
      const wrapper = mount(PostWriter, {
        global: {
          plugins: [pinia, router]
        },
        props: {
          post: {
            id: "1",
            title:"",
            authorId: "1",
            created: "",
            markdown: "",
            html: "",
          }
        }
      })
      wrapper.find<HTMLDivElement>('#contenteditable').element.innerText = '# Title'

      await wrapper.find('#contenteditable').trigger('input');

      setTimeout(async () => {
        await wrapper.find('#submit').trigger('click')
        // console.log(wrapper.html());
        expect(wrapper.emitted().submit[0]).toMatchInlineSnapshot(`
          [
            {
              "authorId": "1",
              "created": "",
              "html": "<h1 id=\\"title\\">Title</h1>
          ",
              "id": "1",
              "markdown": "# Title",
              "title": "",
            },
          ]
        `)
        resolve()
      }, 300);
    });
  })
})
