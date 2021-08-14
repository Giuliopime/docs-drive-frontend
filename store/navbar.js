export const state = () => ({
  opened: false,
})

export const mutations = {
  toggle(state) {
    state.opened = !state.opened
  },
  open(state) {
    state.opened = true
  },
  close(state) {
    state.opened = false
  },
}
