<template>
  <div class="w-full relative">
    <label
      class="block text-left absolute transition-all ease-linear duration-200 cursor-text"
      :class="labelClassList"
      @click="focusInput"
    >
      {{ label }}
    </label>
    <input
      ref="input"
      v-mask="mask"
      :value="value"
      :name="name"
      :type="type"
      :disabled="disabled"
      :placeholder="isFocus ? placeholder : ''"
      class="px-[16px] py-[14px] text-base text-black border border-grey-300 focus:outline-none rounded-[4px] !bg-transparent w-full autofill"
      :class="{ 'border-danger': !isValid }"
      @input="$emit('input', $event.target.value, $event)"
      @focus="isFocus = true"
      @blur="
        isFocus = false
        validatorHandler()
      "
    />
    <div class="mt-[4px] pl-[16px] text-sm">
      <slot name="helperText"></slot>
    </div>
    <div class="mt-[4px] pl-[16px] text-sm text-danger flex flex-col">
      <span v-for="(m, idx) in errorMessages" :key="idx">{{ m }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NuxtTextFiled',
  props: {
    value: {
      type: [String, Number],
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    name: {
      type: String,
      default: '',
    },
    mask: {
      type: String,
      default: '',
    },
    pattern: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    validator: {
      type: [Function, Array],
      default: () => ({
        valid: true,
        errorMessage: '',
      }),
      validator: (v) => {
        const checkValid = (fn) => {
          const data = fn()
          return Boolean(
            typeof data === 'object' &&
              Object.prototype.hasOwnProperty.call(data, 'valid') &&
              Object.prototype.hasOwnProperty.call(data, 'errorMessage')
          )
        }
        if (Array.isArray(v)) {
          // Check each element by function type and call checkValid
          return v.every((f) =>
            typeof f === 'function' ? checkValid(f) : false
          )
        } else {
          // Сall checkValid for one function
          return checkValid(v)
        }
      },
    },
  },
  data() {
    return {
      isFocus: false,
      isValid: true,
      errorMessages: [],
    }
  },
  computed: {
    labelClassList() {
      const сlassList = []
      if (this.isFocus || this.value) {
        сlassList.push(
          'bg-background text-sm py-[2px] px-[4px] translate-x-[12.5px] -translate-y-[9px]'
        )
      } else {
        сlassList.push(
          'px-[16px] py-[14px] text-base translate-x-0 translate-y-0'
        )
      }
      this.isValid
        ? сlassList.push('text-grey-300')
        : сlassList.push('text-danger')
      return сlassList.join(' ')
    },
  },
  methods: {
    focusInput() {
      this.$refs.input.focus()
    },
    validatorHandler() {
      this.errorMessages = []
      if (Array.isArray(this.validator)) {
        const data = this.validator.map((f) => f())
        this.isValid = data.every((i) => {
          if (!i.valid) {
            this.errorMessages.push(i.errorMessage)
            return false
          } else {
            return true
          }
        })
      } else {
        const { valid, errorMessage } = this.validator()
        this.isValid = valid
        this.errorMessages = [errorMessage]
      }
    },
  },
}
</script>

<style lang="scss" scoped>
input.autofill:-webkit-autofill {
  transition: background-color 5000s ease-in-out 0s;
}
</style>
