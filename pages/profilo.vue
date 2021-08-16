<template>
  <div class="relative flex flex-col items-center">
    <span class="title lg:self-start flex-center">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
      <span class="ml-3">I tuoi documenti</span>
    </span>

    <input type="text" placeholder="Cerca" class="mt-8 self-center lg:self-end input-text" v-model="filesFilter" autocomplete="off" @input="searchInFiles">

    <div class="w-full flex flex-col mt-4 border border-black">
      <div v-for="file in filteredFiles" :key="file.id" class="grid grid-cols-2 auto-cols-fr py-2 px-4 border">
        <div class="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/><path d="M14 3v5h5M16 13H8M16 17H8M10 9H8"/></svg>
          <span class="ml-2"> {{ file.name }} </span>
        </div>
        <div class="flex-center justify-between justify-self-end">
          <svg v-on:click="downloadFile(file)" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 9l-5 5-5-5M12 12.8V2.5"/></svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import download from 'downloadjs'

export default {
  data () {
    return {
      files: [],
      filteredFiles: [],
      filesFilter: '',
    }
  },
  beforeMount() {
    this.files = Array.from(this.$auth.user.files)
    this.displayFiles()
  },
  methods: {
    async downloadFile(file) {
      try {
        const response = await this.$docaliAPI(`/files/${file.id}`, {
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

      this.filteredFiles = this.files.filter(file => {
        return file.name.toLowerCase().includes(filter)
      }).sort((a, b) => a.name.localeCompare(b.name));
    },
    displayFiles() {
      this.filteredFiles = this.files
      this.reorderFiles()
    },
    reorderFiles() {
      this.filteredFiles = this.filteredFiles.sort((a, b) => a.name.localeCompare(b.name));
    }
  }
}
</script>