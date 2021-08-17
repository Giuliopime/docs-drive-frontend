<template>
  <div class="flex-center title" data-aos="zoom-in">
    Caricamento...
  </div>
</template>

<script>
export default {
  head: {
    title: '',
    meta: [
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'Documenti - Docali&Dona Intermediazioni Assicurative'
      },
      {
        hid: 'title',
        name: 'title',
        content: 'Documenti - Docali&Dona Intermediazioni Assicurative'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Utilizza il portale documenti per visualizzare e scaricare tutti i tuoi file.'
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: 'Utilizza il portale documenti per visualizzare e scaricare tutti i tuoi file.'
      }
    ]
  },
  mounted() {
    this.$nextTick(() => {
      const newRoute = this.$auth.user.admin ? "/gestione" : `/profilo`
      this.$router.push(newRoute)
    })
  }
}
</script>
