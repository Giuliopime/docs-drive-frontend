<template>
  <div class="flex-center w-full h-full">
    <div class="flex-center flex-col">
      <div class="flex-center flex-col mb-10">
        <span class="title mb-2">Recupera password</span>
        <span class="subtitle">Inserisci la tua mail per recuperare la password</span>
      </div>
      <form @submit.prevent="userLogin" class="flex-center flex-col border-black border-2 rounded-2xl p-4">
        <div class="flex flex-col text-left">
          <label class="text-left">
            Email
          </label>
          <input type="email" v-model="email" class="input-text" v-on:click="hideEmailNotFound">
        </div>

        <span id="success" class="hidden w-full text-left mt-2">
          Ti è stata inviata una mail per il recupero della password, controlla anche lo spam.
        </span>

        <span id="wrong-cred" class="hidden w-full text-red-600 text-left mt-2">
          {{ error }}
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
  name: "Password",
  auth: 'guest',
  layout: 'login',
  head: {
    title: 'Recupero password - ',
    meta: [
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'Recupero password - Documenti - DocsDrive Intermediazioni Assicurative'
      },
      {
        hid: 'title',
        name: 'title',
        content: 'Recupero password - Documenti - DocsDrive Intermediazioni Assicurative'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Recupera la tua password per il portale documenti.'
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: 'Recupera la tua password per il portale documenti.'
      }
    ]
  },
  data() {
    return {
      email: '',
      error: 'Email non registrata'
    }
  },
  methods: {
    userLogin() {
      if (!this.email || this.email === '') {
        this.error = "Inserisci un email valida"
        document.getElementById("wrong-cred").classList.remove("hidden")
        return
      }

      this.$docaliAPI(`/forgotPassword/${this.email}`)
        .then(() => {
          document.getElementById("success").classList.remove("hidden")
        })
        .catch(e => {
          if (e.message.includes('404'))
            this.error = "Email non registrata"
          else
            this.error = "Aspetta almeno 10 minuti prima di inviare un'altra mail"

          document.getElementById("wrong-cred").classList.remove("hidden")
        })
    },
    hideEmailNotFound() {
      const success = document.getElementById("success")
      if (!success.classList.contains("hidden"))
        success.classList.add("hidden")

      const wrongCred = document.getElementById("wrong-cred")
      if (!wrongCred.classList.contains("hidden"))
        wrongCred.classList.add("hidden")
    }
  }
}
</script>
