<template>
  <div class='flex-center title h-full w-full' data-aos="zoom-in">
    Reindirizzamento...
  </div>
</template>

<script>
import redirects from '~/assets/redirects.json'

export default {
  auth: false,
  head () {
    return {
      title: `${this.$route.params.redirect} - `,
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: `${this.$route.params.redirect} - Documenti - DocsDrive Intermediazioni Assicurative`
        },
        {
          hid: 'title',
          name: 'title',
          content: `${this.$route.params.redirect} - Documenti - DocsDrive Intermediazioni Assicurative`
        },
        {
          hid: 'description',
          name: 'description',
          content: `Reindirizzamento a ${this.$route.params.redirect}.`
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: `Reindirizzamento a ${this.$route.params.redirect}.`
        }
      ]
    }
  },
  validate({ params }) {
    return redirects.find(r => r.id === params.redirect)
  },
  mounted() {
    this.$nextTick(() => {
      location.replace(redirects.find(r => r.id === this.$route.params.redirect).url)
    })
  }
}
</script>
