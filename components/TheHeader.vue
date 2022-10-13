<template>
  <header class="bg-white">
    <div class="container mx-auto py-[13px] flex justify-between">
      <a href="/" aria-label="homeLink">
        <div>
          <img src="~/assets/img/logo.svg" alt="Logo" />
        </div>
      </a>
      <div>
        <Button class="mr-[10px]">Users</Button><Button>Sign up</Button>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'NuxtTheHeader',
}
</script>
