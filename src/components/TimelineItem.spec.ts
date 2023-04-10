import { mount } from '@vue/test-utils'
import { it, describe, beforeEach, expect } from 'vitest'
import TimelineItem from './TimelineItem.vue'
import { Post, TimelinePost } from '../posts'
import { DateTime } from 'luxon'
import { createMemoryHistory, createRouter, Router } from 'vue-router'
import { routes } from '../router'

describe('TimelineItem test', () => {

  let router: Router
  beforeEach(() => {
    router = createRouter({
      history: createMemoryHistory(),
      routes,
    })
  })

  const testPost: TimelinePost = {
    id: "1",
    title: "Test Post",
    authorId: "",
    created: DateTime.now(),
    markdown: "# Test",
    html: "<h1>Test</h1>",
  }

  it("render TimelineItem", () => {
    const wrapper = mount(TimelineItem, {
      stubs: [
        'router-link'
      ],
      global: {
        plugins: [router]
      },
      props: {
        post: testPost
      }
    })
    expect(wrapper.find('a').element.getAttribute('href')).toBe('/posts/1')
    expect(wrapper.find<HTMLLinkElement>('[data-testid="post-title"]')
      .element.innerHTML).toBe(testPost.title)
    expect(wrapper.find<HTMLDivElement>('[data-testid="post-created"]').text())
      .toBe(testPost.created.toFormat("d MMM"))
  })

})