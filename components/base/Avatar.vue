<template>
  <div :style="`width: ${width}px; height: ${height}px`">
    <Preloder v-if="src === null" />
    <NuxtImg
      v-if="url && src"
      :src="url"
      :title="title"
      :width="width"
      :height="height"
      alt="Avatar"
      format="webp"
      class="rounded-full"
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
    width: {
      type: Number,
      default: 70,
    },
    height: {
      type: Number,
      default: 70,
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
