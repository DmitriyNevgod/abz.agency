<template>
  <div class="bg-background text-black">
    <Hero />
    <Users :users="users" />
    <Form :positions="positions" :token="token" @submit="getUsers" />
  </div>
</template>

<script>
const defaultUsers = '/users?page=1&count=6'

export default {
  name: 'IndexPage',
  data() {
    return {
      users: null,
      positions: null,
      token: null,
    }
  },
  async mounted() {
    await Promise.allSettled([
      this.$axios.get(defaultUsers),
      this.$axios.get('/positions'),
      this.$axios.get('/token'),
    ]).then((res) => {
      res.forEach((i) => {
        if (i.status === 'fulfilled') {
          if (i.value.data.users) {
            this.users = i.value.data.users
          }
          if (i.value.data.positions) {
            this.positions = i.value.data.positions
          }
          if (i.value.data.token) {
            this.token = i.value.data.token
          }
        }
      })
    })
  },
  methods: {
    async getUsers(state) {
      if (state) {
        const { data } = await this.$axios.get(defaultUsers)
        this.users = data.users
      }
    },
  },
}
</script>
