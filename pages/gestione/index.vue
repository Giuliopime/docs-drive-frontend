<template>
  <div class="flex flex-col items-center">
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
          <svg v-on:click="editPopup = true" class="mx-4 cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="16 3 21 8 8 21 3 21 3 16 16 3"></polygon></svg>
          <svg v-on:click="deletePopup = true" class="cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
        </div>
      </div>
    </div>

    <!-- popup bg blur
    TODO
    <div v-if="createPopup || editPopup || deletePopup" class="absolute z-10 w-full h-full bg-black opacity-70">
      &nbsp;
    </div>
    -->

    <!-- create user popup-->
    <div v-if="createPopup" class="relative popup">
      <svg class="absolute top-2 right-2 h-8 w-8 cursor-pointer" v-on:click="createPopup = false" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      <span class="title mb-4">
        Crea utente
      </span>
      <div class="flex flex-col">
        <div class="flex-center flex-wrap">
          <input class="input-text" type="text" placeholder="Nome">
          <input class="input-text" type="text" placeholder="Cognome">
        </div>

        <input class="input-text" type="text" placeholder="Codice fiscale">

        <div class="flex-center flex-wrap">
          <input class="input-text" type="text" placeholder="Email">
          <input class="input-text" type="text" placeholder="Password">
        </div>
      </div>
      <button class="button w-full mt-4">
        Crea
      </button>
    </div>


    <!-- edit user popup -->
    <div v-if="editPopup" class="relative popup">
      <svg class="absolute top-2 right-2 h-8 w-8 cursor-pointer" v-on:click="editPopup = false" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      <span class="title mb-4">
        Modifica utente
      </span>
      <div class="flex flex-col">
        <div class="flex-center">
          <input class="input-text" type="text" placeholder="Nome">
          <input class="input-text" type="text" placeholder="Cognome">
        </div>

        <input class="input-text" type="text" placeholder="Codice fiscale">

        <div class="flex-center">
          <input class="input-text" type="text" placeholder="Email">
          <input class="input-text" type="text" placeholder="Password">
        </div>
      </div>
      <button class="button w-full mt-4">
        Modifica
      </button>
    </div>

    <!-- delete user popup -->
    <div v-if="deletePopup" class="relative popup">
      <svg class="absolute top-2 right-2 h-8 w-8 cursor-pointer" v-on:click="deletePopup = false" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      <span class="title mb-4">
        Elimina utente
      </span>
      <div class="flex flex-col">
        Sei sicuro di voler eliminare l'utente?
      </div>
      <button class="button w-full mt-4">
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
    }
  },
  async beforeMount () {
    this.users = (await this.$docaliAPI('/admin/users')).data.sort((a, b) => (a.surname + a.name).localeCompare((b.surname + b.name)));
  }
}
</script>

<style scoped>
.input-text {
  @apply m-2
}
</style>
