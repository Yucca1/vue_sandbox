import { mount } from '@vue/test-utils'
import { words } from 'lodash';
import { describe, it, expect, bench } from 'vitest'
import { computed, defineComponent, ref } from 'vue';
import FormInput from './FormInput.vue'

describe("FormInput", () => {
  it("tests validation", async () => {
    const Parent = defineComponent({
      components: { FormInput },
      template: `
        <FormInput
          name="foo"
          type="input"
          :status="status"
          v-model="formValue"
          :show-help="true"
        />
      `,
      setup () {
        const formValue = ref('foo')
        const status = computed(() => {
          if (formValue.value.length > 5) {
            return {
              valid: true
            }
          } else {
            return {
              valid: false,
              message: 'error'
            }
          }
        })
        return {
          formValue,
          status
        }
      }
    })
    const wrapper = mount(Parent)
    expect(wrapper.find('.is-danger').text()).toBe('error')
    await wrapper.find('input').setValue('foobar')
    expect(wrapper.find('.is-danger').exists()).toBe(false)
  })

  it("renders some errors", () => {
    const wrapper = mount(FormInput, {
      props: {
        name: 'foo',
        modelValue: 'bar',
        status: {
          valid: false,
          message: 'error'
        },
        type: 'input',
        showHelp: true,
      }
    });
    expect(wrapper.find('.is-danger').exists()).toBe(true)
  });

  it("renders no error", () => {
    const wrapper = mount(FormInput, {
      props: {
        name: 'foo',
        modelValue: 'bar',
        status: {
          valid: true,
          message: 'error'
        },
        type: 'input',
        showHelp: true,
      }
    });
    expect(wrapper.find('.is-danger').exists()).toBe(false)
  });
});

const person = {
  isActive: true,
  age: 32
}

describe('person', () => {
  it('person is defined', () => {
    expect(person).toBeDefined()
  })

  it('is active', () => {
    expect(person.isActive).toBeTruthy()
  })

  it('age max', () => {
    expect(person.age).toBeLessThanOrEqual(32)
  })
})