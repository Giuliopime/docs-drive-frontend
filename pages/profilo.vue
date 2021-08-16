<template>
  <div class="flex flex-col items-center">
    <span class="title lg:self-start flex-center">
      <svg class="h-8 w-auto" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/><path d="M14 3v5h5M16 13H8M16 17H8M10 9H8"/></svg>
      <span class="ml-3">I tuoi documenti</span>
    </span>

    <input type="text" placeholder="Cerca" class="mt-8 self-center lg:self-end input-text">

    <div class="w-full flex flex-col mt-4 border border-black">
      <div v-for="file in $auth.user.files" :key="file.id" class="grid grid-cols-2 md:grid-cols-4 auto-cols-fr py-2 px-4 border">
        <div class="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          <span class="ml-2"> {{ file.name }}</span>
        </div>
        <svg v-on:click="openEditPopup(user)" class="mx-4 cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="16 3 21 8 8 21 3 21 3 16 16 3"></polygon></svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted () {

  }
}
</script>
