import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
    const result = axios.get(baseUrl);
    return result.then(response => response.data)
}

const create = (newPerson) => {
    const result = axios.post(baseUrl, newPerson);
    return result.then(response => response.data)
}

export default { getAll, create };