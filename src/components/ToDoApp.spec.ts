import { mount } from "@vue/test-utils";
import { it, describe, expect } from "vitest";
import ToDoApp from "./ToDoApp.vue";

describe('renders a todo', () => {
  it("renders a todo", () => {
    const wrapper = mount(ToDoApp)
    const todo = wrapper.find('[data-test="todo"]')
    expect(todo.text()).toBe('Learn Vue.js 3')
  })

  it("create a todo", () => {
    const wrapper = mount(ToDoApp)
    expect(wrapper.findAll('[data-test="todo"]')).toHaveLength(1)
    wrapper.get('[data-test="new-todo"]').setValue('New todo')
    wrapper.get('[data-test="form"]').trigger('submit')
    expect(wrapper.findAll('[data-test="todo"]')).toHaveLength(2)
  })
})