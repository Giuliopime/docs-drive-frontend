<template>
  <div class='flex-center flex-col'>
    <p v-if='error.statusCode === 404' class='title'>Contenuto non trovato...</p>
    <p v-else class='title'>Errore imprevisto</p>
    <nuxt-link to='/' class='flex-center subtitle mt-5'>
      <svg class='text-lg mr-2.5' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H6M12 5l-7 7 7 7"/></svg>
      Torna alla home
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: ['error']
}
</script>
