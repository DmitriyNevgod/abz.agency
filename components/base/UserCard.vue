<template>
  <div ref="name" class="bg-white rounded-[10px] p-[20px] text-center">
    <Avatar class="mx-auto" :url="user.photo" :title="user.name" />
    <div class="w-auto mx-auto">
      <template v-if="user && !userProps">
        <span class="block truncate text-base py-[20px]">{{ user.name }}</span>
        <span class="block truncate text-base">
          {{ user.position }}
        </span>
        <span class="block truncate text-base">{{ user.email }}</span>
        <span class="block truncate text-base">{{ user.phone }}</span>
      </template>
      <template v-else>
        <div v-for="(p, idx) in userProps" :key="idx" class="mx-auto">
          <span
            v-if="p.isTruncate"
            v-tippy
            :content="p.value"
            :class="idx === 0 ? 'py-[20px]' : ''"
            class="block truncate text-base"
          >
            {{ p.value }}
          </span>
          <span
            v-else
            class="block text-base"
            :class="idx === 0 ? 'py-[20px]' : ''"
            >{{ p.value }}</span
          >
        </div>
      </template>
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
      default: null,
    },
  },
  data() {
    return {
      userProps: null,
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
        return 32
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
  methods: {
    updatedTrunscate() {
      this.userProps = []
      const pushProp = (value, idx) => {
        this.userProps.splice(idx, 0, {
          isTruncate: !(String(value).length < this.maxLength),
          value,
        })
      }
      for (const key in this.user) {
        const value = this.user[key]
        switch (key) {
          case 'name':
            pushProp(value, 0)
            break
          case 'position':
            pushProp(value, 1)
            break
          case 'email':
            pushProp(value, 2)
            break
          case 'phone':
            pushProp(value, 3)
            break
        }
      }
    },
  },
}
</script>
