<template>
  <div class="bg-background text-black">
    <Hero />
    <Users :users="users" />
    <Form :positions="positions" />
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  async asyncData({ $axios }) {
    try {
      const data = { users: null, positions: null }
      await Promise.allSettled([
        $axios.get('/users?page=1&count=6'),
        $axios.get('/positions'),
      ]).then((res) => {
        res.forEach((i) => {
          if (i.status === 'fulfilled') {
            if (i.value.data.users) {
              data.users = i.value.data.users
            }
            if (i.value.data.positions) {
              data.positions = i.value.data.positions
            }
          }
        })
      })
      return data
    } catch (e) {
      return { users: null, positions: null }
    }
  },
}
</script>
