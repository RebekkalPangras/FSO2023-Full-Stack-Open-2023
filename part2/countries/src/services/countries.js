import axios from 'axios'

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/"

const readAll = () => {
    const results = axios.get(baseUrl + '/api/all')
    return results.then(response => response.data)
}
const read = (name) => {
    const results = axios.get(baseUrl + `api/name/${name}`)
    return results.then(response => response.data)
}

export default { readAll, read }