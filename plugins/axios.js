const docaliAPIConfig = {
  baseURL: process.env.API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
}

export default function ({ $axios }, inject) {
  $axios.defaults.withCredentials = true
  const docaliAPI = $axios.create(docaliAPIConfig)
  inject('docaliAPI', docaliAPI)
}
