<template>
  <div class="bg-background text-black">
    <Hero />
    <Users :users="users" />
    <Form />
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  async asyncData({ $axios }) {
    try {
      const { data } = await $axios.get('/users?page=1&count=6')
      return { users: data.users }
    } catch (e) {
      return { users: null }
    }
  },
}
</script>
