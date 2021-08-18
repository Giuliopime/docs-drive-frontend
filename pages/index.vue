<template>
  <div class="flex-center title">
    Reindirizzamento...
  </div>
</template>

<script>
import redirects from "assets/redirects.json";

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
      const redirect = this.$auth.user.redirect

      if (!this.$auth.user.admin && redirect && redirect !== '') {
        setTimeout(() => location.replace(redirect),  2000)
      } else {
        const newRoute = this.$auth.user.admin ? "/gestione" : `/profilo`
        this.$router.push(newRoute)
      }
    })
  }
}
</script>
