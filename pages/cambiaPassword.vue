<template>
  <div class="flex-center w-full h-full">
    <div class="flex-center flex-col">
      <div class="flex-center flex-col mb-10">
        <span class="title mb-2">Cambia password</span>
      </div>
      <form @submit.prevent="changePassword" class="flex-center flex-col border-black border-2 rounded-2xl p-4">
        <div class="flex flex-col text-left">
          <label class="text-left">
            Vecchia password
          </label>
          <input type="password" v-model="oldPassword" class="input-text" v-on:click="error = null" required>
        </div>

        <div class="flex flex-col mt-2">
          <label class="text-left">
            Nuova password
          </label>
          <input type="password" v-model="newPassword" minlength="8" class="input-text" v-on:click="error = null" required>
        </div>

        <div class="flex flex-col mt-2">
          <label class="text-left">
            Conferma nuova password
          </label>
          <input type="password" v-model="newPasswordConfirm" minlength="8" class="input-text" v-on:click="error = null" required>
        </div>

        <span :class="(error === null ? 'hidden' : '') + ' w-full max-w-15 text-red-600 text-left mt-2'">
          {{ error }}
        </span>

        <button type="submit" class="button mt-6">
          Cambia
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      error: null,
      oldPassword: '',
      newPassword: '',
      newPasswordConfirm: ''
    }
  },
  methods: {
    async changePassword() {
      if (this.newPassword.length > 50) {
        this.error = "La password è troppo lunga."
        return
      } else if (this.newPassword.search(/\d/) === -1) {
        this.error = "La password deve contenere almeno un numero."
        return
      } else if (this.newPassword.search(/[a-zA-Z]/) === -1) {
        this.error = "La password deve contenere almeno un carattere."
        return
      } else if (this.newPassword !== this.newPasswordConfirm) {
        this.error = "La nuova password e la conferma non coincidono."
        return
      }

      try {
        await this.$docaliAPI.post('/changePassword', { old_password: this.oldPassword, new_password: this.newPassword })
        await this.$router.push("/")
      } catch (err) {
        this.error = "Vecchia password errata"
      }
    }
  }
}
</script>