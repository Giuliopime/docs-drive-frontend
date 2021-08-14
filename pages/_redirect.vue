<template>
  <div class='flex-center title h-full w-full'>
    Reindirizzamento...
  </div>
</template>

<script>
import redirects from '~/assets/redirects.json'

export default {
  auth: false,
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
