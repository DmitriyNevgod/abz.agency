<template>
  <button
    type="button"
    class="text-base w-[100px] py-[4px] rounded-[80px] ease-in duration-200"
    :class="
      disabled
        ? 'text-white bg-gray-200'
        : 'text-black bg-primary-200 hover:bg-primary-100'
    "
    :disabled="disabled"
    v-on="$listeners"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'NuxtButton',
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
