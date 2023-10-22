import axios from "axios";

const baseUrl = "/api/persons"

const getAll = () => {
    const result = axios.get(baseUrl)
    return result.then(response => response.data)
}

const create = (newPerson) => {
    const result = axios.post(baseUrl, newPerson)
    return result.then(response => response.data)
}

const deletePerson = (id) => {
    return axios.delete(baseUrl+`/${id}`)
}

const update = (contact) => {
    console.log(contact)
    const result = axios.put(baseUrl+`/${contact.id}`, contact)
    return result.then(response => response.data)
}

export default { getAll, create, deletePerson, update };