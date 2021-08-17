<template>
  <div class="relative flex flex-col items-center" @keyup.esc="uploadPopup = false; editFilePopup = false; deleteFilePopup = false">
    <span class="title lg:self-start flex-center">
      <svg class="h-8 w-auto min-w-100%" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
      <span class="ml-3">Documenti di {{ $capitalize(userData.name) }} {{ $capitalize(userData.surname) }}</span>
    </span>

    <div class="w-full flex items-center justify-between mt-8">
      <button class="button-small" v-on:click="uploadPopup = true">
        Nuovo
        <svg class="ml-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 11.08V8l-6-6H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h6"/><path d="M14 3v5h5M18 21v-6M15 18h6"/></svg>
      </button>
      <input type="text" placeholder="Cerca" class="input-text w-36 sm:w-80" v-model="filesFilter" autocomplete="off" @input="searchInFiles">
    </div>

    <div v-if="filteredFiles.length > 0" class="w-full flex flex-col mt-4 border border-black">
      <div v-for="file in filteredFiles" :key="file.id" class="grid grid-cols-2 auto-cols-fr py-2 px-4 border">
        <div class="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/><path d="M14 3v5h5M16 13H8M16 17H8M10 9H8"/></svg>
          <span class="ml-2"> {{ file.name }} </span>
        </div>
        <div class="flex-center justify-between justify-self-end">
          <svg v-on:click="downloadFile(file)" class="blue-hover" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 9l-5 5-5-5M12 12.8V2.5"/></svg>
          <svg v-on:click="editFilePopup = true; selectedFile = file" class="blue-hover mx-4 cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="16 3 21 8 8 21 3 21 3 16 16 3"></polygon></svg>
          <svg v-on:click="deleteFilePopup = true; selectedFile = file" class="blue-hover cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
        </div>
      </div>
    </div>

    <div v-else class="subtitle mt-8">
      Nessun documento trovato...
    </div>

    <!-- popup background -->
    <div v-if="uploadPopup || editFilePopup || deleteFilePopup" class="absolute z-10 inset-0 w-full h-full bg-black opacity-70" />

    <div v-if="uploadPopup" class="popup">
      <svg class="absolute top-2 right-2 h-8 w-8 cursor-pointer red-hover" v-on:click="uploadPopup = false" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      <span class="title mb-4">
        Carica file
      </span>

      <input id="file-input" class="w-full xl:w-auto" type="file" multiple="true" v-on:click="uploadError = null" value="Scegli">

      <span :class="uploadError === null ? 'hidden' : ''" class="w-full text-red-600 text-left mt-2">
          {{ uploadError }}
      </span>

      <button class="button w-full mt-4" v-on:click="uploadFile">
        Carica
      </button>
    </div>

    <!-- edit user popup -->
    <div v-if="editFilePopup" class="popup">
      <svg class="absolute top-2 right-2 h-8 w-8 cursor-pointer red-hover" v-on:click="editFilePopup = false" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      <span class="title mb-4">
        Rinomina file
      </span>
      <input class="input-text w-full xl:w-auto" type="text" v-model="editName" :placeholder="selectedFile.name.split('.').slice(0, -1).join('.')">
      <span :class="editError === null ? 'hidden' : ''" class="w-full text-red-600 text-left mt-2">
          {{ editError }}
      </span>

      <button v-on:click="editFile" class="button w-full mt-4">
        Rinonima
      </button>
    </div>

    <div v-if="deleteFilePopup" class="popup">
      <svg class="absolute top-2 right-2 h-8 w-8 cursor-pointer red-hover" v-on:click="deleteFilePopup = false" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      <span class="title mb-4">
        Elimina file
      </span>
      <div class="flex flex-col subtitle">
        Sei sicuro di voler eliminare il documento?
      </div>
      <span :class="deleteError === null ? 'hidden' : ''" class="w-full text-red-600 text-left mt-2">
          {{ deleteError }}
      </span>
      <button v-on:click="deleteFile" class="button w-full mt-4">
        Conferma
      </button>
    </div>
  </div>
</template>

<script>
import download from 'downloadjs'

export default {
  head: {
    title: `Gestione documenti di ${this.$route.params.email} - `,
    meta: [
      {
        hid: 'og:title',
        property: 'og:title',
        content: `Gestione documenti di ${this.$route.params.email} - Documenti - Docali&Dona Intermediazioni Assicurative`
      },
      {
        hid: 'title',
        name: 'title',
        content: `Gestione documenti di ${this.$route.params.email} - Documenti - Docali&Dona Intermediazioni Assicurative`
      },
      {
        hid: 'description',
        name: 'description',
        content: `Crea, modifica, elimina e scarica i documenti di ${this.$route.params.email}.`
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: `Crea, modifica, elimina e scarica i documenti di ${this.$route.params.email}.`
      }
    ]
  },
  data () {
    return {
      userData: {
        email: 'placeholder',
        files: []
      },

      filteredFiles: [],
      filesFilter: '',

      uploadPopup: false,
      uploadError: null,

      selectedFile: null,

      editFilePopup: false,
      editName: '',
      editError: null,

      deleteFilePopup: false,
      deleteError: null,
    }
  },
  async beforeMount () {
    const email = decodeURIComponent(this.$route.params.email)
    this.userData = (await this.$docaliAPI(`/admin/user/${email}`)).data
    this.displayFiles()
  },
  mounted() {
    try {
      document.getElementById("back-btn").classList.add("shown")
    } catch (error) {}
  },
  beforeRouteLeave (to, from , next) {
    try {
      document.getElementById("back-btn").classList.remove("shown")
    } catch (error) {}
    next()
  },
  methods: {
    async uploadFile() {
      const files = document.getElementById("file-input").files
      if (files.length === 0) {
        this.uploadError = 'Seleziona almeno un file'
        return
      }

      const formData = new FormData();
      for (let i=0; i<files.length; i++)
        formData.append(`file_${i}`, files[i]);

      try {
        await this.$docaliAPI.put(
          `/admin/user/${this.userData.email}/files`,
          formData,
          {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
          }
        )

        this.userData = (await this.$docaliAPI(`/admin/user/${this.userData.email}`)).data
        this.displayFiles()
        this.uploadPopup = false
      } catch (error) {
        this.uploadError = 'Errore imprevisto riprova'
      }
    },
    async downloadFile(file) {
      try {
        const response = await this.$docaliAPI(`/admin/user/${this.userData.email}/files/${file.id}`, {
          responseType: 'blob',
        })
        download(response.data, file.name)
      } catch (error) {
        console.log(error)
      }
    },
    searchInFiles () {
      const filter = this.filesFilter.toLowerCase()
      if (filter === '')
        return this.displayFiles()

      this.filteredFiles = this.userData.files.filter(file => {
        return file.name.toLowerCase().includes(filter)
      }).sort((a, b) => a.name.localeCompare(b.name));
    },
    displayFiles() {
      this.filteredFiles = this.userData.files
      this.reorderFiles()
    },
    reorderFiles() {
      this.filteredFiles = this.filteredFiles.sort((a, b) => a.name.localeCompare(b.name));
    },
    async editFile() {
      let newName = this.editName
      if (newName === '') {
        this.editError = "Inserisci un nome valido"
        return
      }

      const fileType = this.selectedFile.name.split('.').pop();
      const newInfo = {
        new_name: newName + "." + fileType
      }

      try {
        await this.$docaliAPI.post(`/admin/user/${this.userData.email}/files/${this.selectedFile.id}`, newInfo)
        this.filteredFiles[this.filteredFiles.indexOf(this.selectedFile)].name = newName + "." + fileType
        this.reorderFiles()
        this.editFilePopup = false
      } catch (error) {
        console.log(error)
        this.editError = "Qualcosa è andato storto"
      }
    },
    async deleteFile() {
      try {
        await this.$docaliAPI.delete(`/admin/user/${this.userData.email}/files/${this.selectedFile.id}`)
        this.userData.files.splice(this.userData.files.findIndex(file => file.id === this.selectedFile.id), 1)
        this.displayFiles()
        this.deleteFilePopup = false
      } catch (error) {
        console.log(error)
        this.deleteError = 'Error imprevisto, riprova'
      }
    }
  }
}
</script>

<style>
.shown {
  stroke: black;
}
</style>