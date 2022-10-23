<template>
  <header class="bg-white">
    <div class="container mx-auto py-[13px] flex justify-between">
      <nuxt-link to="/" aria-label="homeLink" class="flex item-center">
        <img src="~/assets/img/logo.svg" alt="Logo" :width="105" :height="25" />
      </nuxt-link>
      <div>
        <Button class="mr-[10px]">
          <nuxt-link :to="{ path: '/', hash: '#users' }">
            Users
          </nuxt-link> </Button
        ><Button>
          <nuxt-link :to="{ path: '/', hash: '#sign' }"> Sign up </nuxt-link>
        </Button>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'NuxtTheHeader',
}
</script>
