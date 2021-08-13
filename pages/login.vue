<template>
  <div class="flex-center w-full h-full">
    <div class="flex-center flex-col">
      <div class="flex-center flex-col mb-10">
        <span class="text-3xl mb-2">Benvenuto</span>
        <span class="text-lg">Effettua il login per continuare</span>
      </div>
      <form @submit.prevent="userLogin" class="flex-center flex-col border-black border-4 rounded-2xl p-4">
        <div class="flex flex-col text-left">
          <label class="text-left">
            Email
          </label>
          <input type="email" v-model="login.email" class="input-text" v-on:click="hideWrongCredentials">
        </div>

        <div class="flex flex-col mt-2">
          <label class="text-left">
            Password
          </label>
          <input type="password" v-model="login.password" class="input-text" v-on:click="hideWrongCredentials">
        </div>

        <span id="wrong-cred" class="hidden w-full text-red-600 text-left mt-2">
          Credenziali errate
        </span>

        <button type="submit" class="button mt-6">
          Login
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      login: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    async userLogin() {
      try {
        await this.$auth.loginWith('cookie', { data: this.login })
      } catch (err) {
        document.getElementById("wrong-cred").classList.remove("hidden")
      }
    },
    hideWrongCredentials() {
      const wrongCred = document.getElementById("wrong-cred")
      if (!wrongCred.classList.contains("hidden"))
        wrongCred.classList.add("hidden")
    }
  }
}
</script>
