<template>
  <div class="w-full h-16 flex items-center justify-between p-4 border-b border-black">
    <button class="w-8 cursor-pointer" v-on:click="$router.back()">
      <svg v-if="$route.fullPath.includes('gestione/utente')" class="blue-hover" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
      <span v-else>
        &nbsp;
      </span>
    </button>
    <nuxt-link to="/" class="flex-center title">
      <span class="text-primary">Docali&nbsp;</span> <span class="italic text-secondary text-2xl sm:text-3xl">assicurazioni</span>
    </nuxt-link>
    <button id="navbar-btn" v-on:click="toggle" class="blue-hover">
      <span class="hidden lg:flex w-2">
        &nbsp;
      </span>
      <svg class="lg:hidden h-8 w-8" v-if="!navbarOpened" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
      <svg class="lg:hidden h-8 w-8" v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
    </button>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: "Header",
  computed: {
    navbarOpened () {
      return this.$store.state.navbar.opened
    }
  },
  methods: {
    ...mapMutations({
      toggle: 'navbar/toggle'
    })
  }
}
</script>
