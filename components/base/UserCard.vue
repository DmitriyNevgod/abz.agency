<template>
  <div ref="name" class="bg-white rounded-[10px] p-[20px] text-center">
    <Avatar class="mx-auto" :url="user.photo" :title="user.name" />
    <!-- <h3 class="my-[20px] truncate">{{ user.name }}</h3> -->
    <div class="w-auto mx-auto">
      <div v-for="(p, idx) in userProps" :key="idx" class="mx-auto">
        <span
          v-if="p.isTruncate"
          v-tippy
          :content="p.value"
          class="block truncate"
        >
          {{ p.value }}
        </span>
        <span v-else class="block">{{ p.value }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import config from '@/tailwind.config'

export default {
  name: 'NuxtUserCard',
  props: {
    user: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      userProps: [],
    }
  },
  computed: {
    maxLength() {
      const windowWidth = window.innerWidth
      const breakpoints = config.theme.extend.screens // sm: '640px', md: '768px', lg: '1024px', xl: '1280px', 2xl: '1536px'

      if (windowWidth >= Number.parseInt(breakpoints['2xl'])) {
        return 40
      } else if (windowWidth >= Number.parseInt(breakpoints.xl)) {
        return 35
      } else if (windowWidth >= Number.parseInt(breakpoints.md)) {
        return 30
      } else {
        return 25
      }
    },
  },
  mounted() {
    this.updatedTrunscate()
    window.addEventListener('resize', this.updatedTrunscate)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.updatedTrunscate)
  },
  updated() {
    // this.updatedTrunscate()
  },
  methods: {
    updatedTrunscate() {
      this.userProps = []
      const pushProp = (value) => {
        console.log('maxLength', this.maxLength)
        console.log('String(value).lenght', value.toString().length)
        this.userProps.push({
          isTruncate: !(String(value).length < this.maxLength),
          value,
        })
      }
      for (const key in this.user) {
        const value = this.user[key]
        switch (key) {
          case 'name':
            pushProp(value)
            break
          case 'position':
            pushProp(value)
            break
          case 'email':
            pushProp(value)
            break
          case 'phone':
            pushProp(value)
            break
        }
      }
    },
  },
}
</script>
