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
  async asyncData({ $axios }) {
    const data = { users: null, positions: null, token: null }
    try {
      await Promise.allSettled([
        $axios.get(defaultUsers),
        $axios.get('/positions'),
        $axios.get('/token'),
      ]).then((res) => {
        res.forEach((i) => {
          if (i.status === 'fulfilled') {
            if (i.value.data.users) {
              data.users = i.value.data.users
            }
            if (i.value.data.positions) {
              data.positions = i.value.data.positions
            }
            if (i.value.data.token) {
              data.token = i.value.data.token
            }
          }
        })
      })
      return data
    } catch (e) {
      return data
    }
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
