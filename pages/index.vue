<template>
  <div class="flex-center title">
    Caricamento...
  </div>
</template>

<script>
export default {
  mounted() {
    this.$nextTick(() => {
      const newRoute = this.$auth.user.admin ? "/gestione" : `/utenti/${this.$auth.user.email}`
      this.$router.push(newRoute)
    })
  }
}
</script>
