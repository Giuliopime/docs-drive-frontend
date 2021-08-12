const docaliAPIConfig = {
  baseURL: 'http://localhost:12000/v1',
  headers: {
    'Content-Type': 'application/json'
  }
}

export default function ({ $axios }, inject) {
  const docaliAPI = $axios.create(docaliAPIConfig)
  inject('docaliAPI', docaliAPI)
}
