<template>
  <div class="w-full h-full flex flex-col">
    <Header />
    <NavbarMobile v-if="navbarOpened" class="lg:hidden"/>
    <BlurBGNavbarMobile v-if="navbarOpened" />
    <div class="flex flex-grow">
      <Nuxt class="flex-grow py-6 px-6 lg:px-12" />
      <Navbar class="hidden lg:flex" />
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
