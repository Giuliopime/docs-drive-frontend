<template>
  <nav class="hidden lg:flex h-full flex-col py-4 px-8 border-r-2 border-black">
    <span class="text-lg mb-2">
        Account
      </span>
    <div v-if="$auth.loggedIn" class="flex flex-col">
        <span>
          {{ $auth.user.surname }} {{ $auth.user.name }}
        </span>
      <span>
          {{ $auth.user.email }}
        </span>
      <button class="button-small mt-2">
        Logout
      </button>
    </div>
    <div v-else>
      <nuxt-link to="/login" class="button-small">
        Login
      </nuxt-link>
    </div>

    <span class="text-lg mt-8 mb-2">
        Link utili
      </span>
    <nuxt-link to="/1">
      Uno
    </nuxt-link>
    <nuxt-link to="/1">
      Due
    </nuxt-link>
    <nuxt-link to="/1">
      Tre
    </nuxt-link>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  computed: {
    navbarOpened () {
      return this.$store.state.navbar.opened
    }
  },
}
</script>
