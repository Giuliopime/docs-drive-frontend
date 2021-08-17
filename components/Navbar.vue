<template>
  <div id="navbar-desktop" class="h-full flex flex-col bg-white py-4 pl-4 pr-8 border-l border-black">
    <span class="subtitle mb-1">
        Account
      </span>
    <div v-if="$auth.loggedIn" class="flex flex-col">
      <span>
        {{ $capitalize($auth.user.surname) }} {{ $capitalize($auth.user.name) }}
      </span>
      <span>
          {{ $auth.user.email }}
      </span>
      <button v-on:click="logout" class="flex-center button-small-red mt-2">
        <span class="mr-2">Logout</span>
        <svg class="h-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 3H6a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h4M16 17l5-5-5-5M19.8 12H9"/></svg>
      </button>
    </div>
    <div v-else>
      <nuxt-link to="/login" class="flex-center button-small">
        <span class="mr-2">
          Login
        </span>
        <svg class="h-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M13.8 12H3"/></svg>
      </nuxt-link>
    </div>

    <span class="subtitle mt-8 mb-1">
        Link utili
    </span>
    <nuxt-link v-for="redirect in redirects" :key="redirect.id" :to="redirect.id" class="flex items-center">
      <svg class="h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
      <span class="ml-1">
        {{ redirect.name }}
      </span>
    </nuxt-link>
  </div>
</template>

<script>
import redirects from '~/assets/redirects.json'

export default {
  name: "Navbar",
  data() {
    return {
      redirects
    }
  },
  methods: {
    async logout() {
      try {
        await this.$auth.logout()
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
