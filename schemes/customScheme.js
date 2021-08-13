import { LocalScheme } from '~auth/runtime'

export default class CustomScheme extends LocalScheme {
  // Override `fetchUser` method of `local` scheme
  async fetchUser (endpoint) {
    // User endpoint is disabled.
    if (!this.options.endpoints.user) {
      this.$auth.setUser({})
      return
    }

    // Try to fetch user and then set
    return this.$auth.requestWith(
      this.name,
      endpoint,
      this.options.endpoints.user
    ).then((response) => {
      this.$auth.setUser(response.data)

      return response
    }).catch((error) => {
      this.$auth.callOnError(error, { method: 'fetchUser' })
    })
  }
}
