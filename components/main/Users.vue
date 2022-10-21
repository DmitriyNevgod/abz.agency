<template>
  <div class="mt-[140px] container mx-auto text-center">
    <h2 class="text-title text-center mb-[50px]">Working with GET request</h2>

    <template v-if="users">
      <!-- users list -->
      <div class="grid gap-[16px] grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <UserCard v-for="u in localUsers" :key="u.id" :user="u" />
      </div>

      <!-- show more -->
      <div class="mt-[50px] mx-auto flex justify-center">
        <Preloder v-if="loading" />
        <Button v-else-if="!isLimit" class="w-[120px]" @click="loadMore">
          Show more
        </Button>
      </div>
    </template>

    <!-- error -->
    <span v-if="!users || isError" class="text-base">Failed to load data</span>
  </div>
</template>

<script>
export default {
  name: 'NuxtUsers',
  props: {
    users: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      localUsers: this.users,
      loading: false,
      isError: false,
      isLimit: false,
    }
  },
  watch: {
    users(value) {
      this.localUsers = value
    },
  },
  methods: {
    async loadMore() {
      this.loading = true
      this.isError = false
      const uLength = this.localUsers.length

      try {
        const { data } = await this.$axios.get('/users', {
          params: {
            page: 1,
            offset: uLength,
            count: 6,
          },
        })
        this.localUsers.splice(uLength, 0, ...data.users)
        this.isLimit = Boolean(data.total_users === this.localUsers.length)
      } catch (e) {
        this.isError = true
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
