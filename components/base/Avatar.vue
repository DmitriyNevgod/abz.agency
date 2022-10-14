<template>
  <div class="w-[70px] h-[70px]">
    <Preloder v-if="src === null" class="pt-[18px] w-[70px] h-[70px]" />
    <img
      v-if="url && src"
      :src="src"
      :title="title"
      alt="Avatar"
      class="w-[70px] h-[70px] rounded-full"
    />
  </div>
</template>

<script>
export default {
  name: 'NuxtAvatar',
  props: {
    url: {
      type: String,
      require: true,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      src: null,
      loading: false,
    }
  },
  mounted() {
    this.checkImg(this.url)
  },
  methods: {
    checkImg(url) {
      const img = new Image()
      img.onload = () => {
        this.src = url
      }
      img.onerror = () => {
        this.src = require('~/assets/img/no-avatar.svg')
      }
      img.src = url
    },
  },
}
</script>
