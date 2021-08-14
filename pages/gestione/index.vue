<template>
  <div class="relative flex flex-col items-center" @keyup.esc="editPopup = false; createPopup = false; deletePopup = false">
    <span class="title lg:self-start flex-center">
      <svg class="h-8 w-auto" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
      <span class="ml-3">Gestisci utenti</span>
    </span>

    <div class="w-full flex items-center justify-between mt-8">
      <button class="button-small" v-on:click="createPopup = true">
        Nuovo
        <svg class="ml-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>
      </button>
      <input type="text" placeholder="Cerca" class="input-text">
    </div>

    <div class="w-full flex flex-col mt-4 border border-black">
      <div v-for="user in users" :key="user.email" class="grid grid-cols-2 md:grid-cols-4 auto-cols-fr py-2 px-4 border">
        <div class="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          <span class="ml-2"> {{ user.surname }} {{ user.name }} </span>
        </div>
        <span class="hidden md:block"> {{user.id_code }}</span>
        <span class="hidden md:block"> {{ user.email }}</span>
        <div class="flex-center justify-between justify-self-end">
          <nuxt-link :to="`/gestione/${user.email}`">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
          </nuxt-link>
          <svg v-on:click="openEditPopup(user)" class="mx-4 cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="16 3 21 8 8 21 3 21 3 16 16 3"></polygon></svg>
          <svg v-on:click="deletePopup = true; selectedUser = user" class="cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
        </div>
      </div>
    </div>

    <!-- popup background -->
    <div v-if="createPopup || editPopup || deletePopup" class="absolute z-10 inset-0 w-full h-full bg-black opacity-70" />

    <!-- create user popup-->
    <div v-if="createPopup" class="popup">
      <svg class="absolute top-2 right-2 h-8 w-8 cursor-pointer" v-on:click="createPopup = false" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      <span class="title mb-4">
        Crea utente
      </span>
      <div class="flex flex-col">
        <div class="flex-center flex-wrap">
          <input class="input-text w-full xl:w-auto" type="text" placeholder="Nome" v-model="createName">
          <input class="input-text w-full xl:w-auto" type="text" placeholder="Cognome" v-model="createSurname">
        </div>

        <input class="input-text" type="text" placeholder="Codice fiscale" v-model="createIDCode">

        <div class="flex-center flex-wrap">
          <input class="input-text  w-full xl:w-auto" type="text" placeholder="Email" v-model="createEmail">
          <input class="input-text  w-full xl:w-auto" type="text" placeholder="Password" v-model="createPassword">
        </div>

        <div class="flex items-center">
          <input type="checkbox" class="input-text h-6 w-6 mr-2" v-model="createAdmin" :true-value="true" :false-value="false">
          <label>Amministratore</label>
        </div>
      </div>

      <span :class="createError === null ? 'hidden' : ''" class="w-full text-red-600 text-left mt-2">
          {{ createError }}
      </span>

      <button class="button w-full mt-4" v-on:click="createUser">
        Crea
      </button>
    </div>


    <!-- edit user popup -->
    <div v-if="editPopup" class="popup">
      <svg class="absolute top-2 right-2 h-8 w-8 cursor-pointer" v-on:click="editPopup = false" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      <span class="title mb-4">
        Modifica utente
      </span>
      <div class="flex flex-col">
        <div class="flex-center flex-wrap">
          <input class="input-text w-full xl:w-auto" type="text" v-model="editName">
          <input class="input-text w-full xl:w-auto" type="text" v-model="editSurname">
        </div>

        <input class="input-text" type="text" v-model="editIDCode">

        <div class="flex-center flex-wrap">
          <input class="input-text  w-full xl:w-auto" type="text" v-model="editEmail" readonly>
          <input class="input-text  w-full xl:w-auto" type="text" v-model="editPassword">
        </div>

        <div class="flex items-center">
          <input type="checkbox" class="input-text h-6 w-6 mr-2" v-model="editAdmin" :true-value="true" :false-value="false">
          <label>Amministratore</label>
        </div>
      </div>

      <span :class="editError === null ? 'hidden' : ''" class="w-full text-red-600 text-left mt-2">
          {{ editError }}
      </span>

      <button v-on:click="editUser" class="button w-full mt-4">
        Modifica
      </button>
    </div>

    <!-- delete user popup -->
    <div v-if="deletePopup" class="popup">
      <svg class="absolute top-2 right-2 h-8 w-8 cursor-pointer" v-on:click="deletePopup = false" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      <span class="title mb-4">
        Elimina utente
      </span>
      <div class="flex flex-col subtitle">
        Sei sicuro di voler eliminare l'utente?
      </div>
      <span :class="deleteError === null ? 'hidden' : ''" class="w-full text-red-600 text-left mt-2">
          {{ deleteError }}
      </span>
      <button v-on:click="deleteUser" class="button w-full mt-4">
        Conferma
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      users: [],

      createPopup: false,
      editPopup: false,
      deletePopup: false,

      createName: '',
      createSurname: '',
      createIDCode: '',
      createEmail: '',
      createPassword: '',
      createAdmin: false,
      createError: null,

      selectedUser: null,

      editName: '',
      editSurname: '',
      editIDCode: '',
      editEmail: '',
      editPassword: '',
      editAdmin: false,
      editError: null,

      deleteError: null
    }
  },
  async beforeMount () {
    this.users = (await this.$docaliAPI('/admin/users')).data
    this.displayUsers()
  },
  mounted() {

  },
  methods: {
    openEditPopup (user) {
      this.selectedUser = user
      this.editName = user.name
      this.editSurname = user.surname
      this.editEmail = user.email
      this.editPassword = user.password
      this.editIDCode = user.id_code
      this.editAdmin = user.admin
      this.editPopup = true
    },
    async createUser() {
      this.createError = null

      if (this.createName === '' || this.createSurname === '' || this.createEmail === '' || this.createPassword === '' || this.createIDCode === '') {
        this.createError = "Compila tutti i campi"
        return
      }

      const newUser = {
        name: this.createName,
        surname: this.createSurname,
        id_code: this.createIDCode,
        email: this.createEmail,
        password: this.createPassword,
        admin: this.createAdmin
      }

      try {
        await this.$docaliAPI.put(`/admin/user/${newUser.email}`, newUser)
        this.users.push(newUser)
        this.displayUsers()
        this.createPopup = false
      } catch (error) {
        const code = error.response.status
        this.createError = code === 405 ? "Email già registrata" : "Errore imprevisto"
      }
    },
    async editUser() {
      this.editError = null

      if (this.editName === '' || this.editSurname === '' || this.editPassword === '' || this.editIDCode === '') {
        this.editError = "Compila tutti i campi"
        return
      }

      const newUserData = {
        name: this.editName,
        surname: this.editSurname,
        id_code: this.editIDCode,
        email: this.selectedUser.email,
        password: this.editPassword,
        admin: this.editAdmin
      }

      try {
        await this.$docaliAPI.post(`/admin/user/${newUserData.email}`, newUserData)
        const userIndex = this.users.findIndex(user => user.email === this.selectedUser.email)
        this.users[userIndex] = newUserData
        this.displayUsers()
        this.editPopup = false
      } catch (error) {
        this.createError = "Qualcosa è andato storto, prova a ricaricare la pagina"
      }
    },
    async deleteUser() {
      try {
        await this.$docaliAPI.delete(`/admin/user/${this.selectedUser.email}`)
        const userIndex = this.users.findIndex(user => user.email === this.selectedUser.email)
        this.users.splice(userIndex, 1)
        this.displayUsers()
        this.deletePopup = false
      } catch (error) {
        this.deleteError = 'Qualcosa è andato storto, prova a ricaricare la pagina'
      }
    },
    displayUsers() {
      this.users = this.users.sort((a, b) => (a.surname + a.name).localeCompare((b.surname + b.name)));
    }
  }
}
</script>

<style scoped>
.input-text {
  @apply m-2
}
</style>
