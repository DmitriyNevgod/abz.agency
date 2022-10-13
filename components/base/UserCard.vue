<template>
  <div class="bg-white rounded-[10px] p-[20px] text-center">
    <Avatar class="mx-auto" :url="user.photo" :title="user.name" />
    <h3 class="my-[20px]">{{ user.name }}</h3>
    <div class="mx-auto">
      <span v-if="isTruncate">
        <span
          isTippy
          content="Frontend Developer Frontend"
          class="block truncate"
        >
          {{ user.position }}
        </span>
      </span>
      <span v-else class="block">{{ user.position }}</span>
      <span class="block">{{ user.email }}</span>
      <span class="block">{{ user.phone }}</span>
    </div>
  </div>
</template>

<script>
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
      isTruncate: true,
      isTippy: 'v-tippy',
    }
  },
}
</script>
