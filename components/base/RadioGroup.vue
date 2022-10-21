<template>
  <div class="w-auto">
    <div
      v-for="i in localList"
      :key="i.value"
      class="flex select-none cursor-pointer w-max items-center"
      @click="inputHandler(i)"
    >
      <div
        class="relative cursor-pointer rounded-full border border-solid border-grey-100 w-[20px] h-[20px]"
        :class="
          i.checked
            ? `border-secondary before:content-[''] before:block before:absolute before:h-[10px] before:w-[10px] before:bg-secondary before:top-[4px] before:left-[4.5px] before:rounded-full`
            : ''
        "
      ></div>
      <input
        class="invisible"
        type="radio"
        :value="i.inputValue"
        :checked="i.checked"
      />
      <label class="cursor-pointer text-base">{{ i.label }}</label>
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
      this.localList = this.list.map((i) => {
        i.checked = !!(i.value === e.value)
        return i
      })
      this.$emit('input', e.value)
    },
  },
}
</script>
