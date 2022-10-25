<template>
  <div class="w-auto">
    <div
      v-for="i in localList"
      :key="i.value"
      class="flex select-none w-max items-center"
      :class="{ 'cursor-pointer': !disabled }"
      @click="inputHandler(i)"
    >
      <div
        class="box-content relative rounded-full border border-solid border-gray-100 w-[20px] h-[20px] before:content-[''] before:block before:absolute before:h-[10px] before:w-[10px] before:top-[5px] before:left-[5px] before:rounded-full"
        :class="
          i.checked && !disabled
            ? 'border-secondary before:bg-secondary cursor-pointer'
            : i.checked && disabled
            ? 'border-gray-100  before:bg-gray-200'
            : ''
        "
      ></div>
      <input
        class="invisible"
        type="radio"
        :disabled="disabled"
        :value="i.inputValue"
        :checked="i.checked"
      />
      <label class="text-base" :class="{ 'cursor-pointer': !disabled }">
        {{ i.label }}
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NuxtRadioGroup',
  props: {
    value: {
      type: [String, Number],
      default: '',
    },
    defaultFirst: {
      type: Boolean,
      default: false,
    },
    list: {
      type: [Array],
      required: true,
      default: () => [
        {
          label: 'label',
          value: '', // Unique
          checked: false,
        },
      ],
      validator: (v) => {
        if (Array.isArray(v)) {
          return v.every((obj) =>
            Boolean(
              typeof obj === 'object' &&
                Object.prototype.hasOwnProperty.call(obj, 'label') &&
                Object.prototype.hasOwnProperty.call(obj, 'value') &&
                Object.prototype.hasOwnProperty.call(obj, 'checked')
            )
          )
        } else {
          return false
        }
      },
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      localList: this.list,
    }
  },
  mounted() {
    if (this.value) {
      this.localList = this.list.map((i) => {
        i.checked = !!(i.value === this.value)
        return i
      })
    } else if (this.defaultFirst) {
      this.localList[0].checked = true
      this.$emit('input', this.localList[0].value)
    }
  },
  methods: {
    inputHandler(e) {
      if (this.disabled) return

      this.localList = this.list.map((i) => {
        i.checked = !!(i.value === e.value)
        return i
      })
      this.$emit('input', e.value)
    },
  },
}
</script>
