<template>
  <div class="container mx-auto">
    <div
      class="flex flex-col items-center justify-center text-white bg-[url('~/assets/img/hero-bg.jpeg')] bg-cover bg-no-repeat bg-center h-[80vh] hero"
    >
      <div class="text-center w-[90%] sm:w-[380px] z-10">
        <h1 class="text-title mb-[21px]">
          Test assignment for front-end developer
        </h1>

        <p class="mb-[32px]">
          What defines a good front-end developer is one that has skilled
          knowledge of HTML, CSS, JS with a vast understanding of User design
          thinking as they'll be building web interfaces with accessibility in
          mind. They should also be excited to learn, as the world of Front-End
          Development keeps evolving.
        </p>

        <Button>
          <nuxt-link :to="{ path: '/', hash: '#sign' }">
            Sign up
          </nuxt-link></Button
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NuxtHero',
}
</script>

<style lang="scss" scoped>
.hero {
  position: relative;
  &::after {
    content: '';
    position: absolute;
    display: block;
    height: 100%;
    width: 100%;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5));
  }
}
</style>
