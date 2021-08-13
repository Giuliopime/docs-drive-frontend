<template>
  <div class="w-full h-full flex flex-col">
    <Header />
    <NavbarMobile v-if="navbarOpened" />
    <div class="flex flex-grow">
      <Navbar />
      <Nuxt class="flex-grow" />
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    navbarOpened () {
      return this.$store.state.navbar.opened
    }
  },
}
</script>
