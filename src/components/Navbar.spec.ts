import { mount } from '@vue/test-utils'
import { createPinia, Pinia, setActivePinia } from 'pinia';
import { describe, it, expect, beforeEach, vi} from 'vitest'
import { computed, createRenderer, defineComponent, ref } from 'vue';
import { createMemoryHistory, createRouter, Router } from 'vue-router';
import Navbar from './Navbar.vue'
import { routes } from '../router';
import { useUsers } from '../stores/users';
import UserFormVue from './UserForm.vue';

// jest
// vi.fn

vi.stubGlobal('fetch', vi.fn(() => {
  //...
}))

describe("Navbar", () => {
  let pinia: Pinia
  let router: Router

  beforeEach(() => {
    const el = document.createElement('div')
    el.id = 'modal'
    document.body.appendChild(el)

    pinia = createPinia()
    setActivePinia(pinia)
    router = createRouter({
      history: createMemoryHistory(),
      routes,
    })
  })

  it("renders signin and signup buttons when not authenticated", async () => {

    const wrapper = mount(Navbar, {
      global: {
        plugins: [pinia, router]
      }
    })
    expect(wrapper.find('#sign-up').exists()).toBe(true)
    expect(wrapper.find('[data-testid="sign-in"').exists()).toBe(true)
  })

  it("renders new post and logout when authenticated", async () => {

    const userStore = useUsers()
    userStore.currentUserId = "1"

    const wrapper = mount(Navbar, {
      global: {
        plugins: [pinia, router]
      }
    })
    expect(wrapper.find('a').text()).toBe('New Post')
    expect(wrapper.find('button').text()).toBe('Log Out')

    await wrapper.find('#logout').trigger('click')

    expect(wrapper.find('#sign-up').exists()).toBe(true)
    expect(wrapper.find('[data-testid="sign-in"').exists()).toBe(true)

    await wrapper.find('[data-testid="sign-in"').trigger('click')

    expect(document.body.querySelector('#signin-form')).toBeTruthy()
  })
})
