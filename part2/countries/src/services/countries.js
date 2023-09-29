import axios from 'axios'

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/"
const openWeatherUrl = "https://api.openweathermap.org/data/2.5/weather"
const weatherIconUrl = "https://openweathermap.org/img/wn/"

const apiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY

const readAll = () => {
    const results = axios.get(baseUrl + '/api/all')
    return results.then(response => response.data)
}
const read = (name) => {
    const results = axios.get(baseUrl + `api/name/${name}`)
    return results.then(response => response.data)
}

const getWeather = (lat, long) => {
    const result = axios.get(openWeatherUrl + `?lat=${lat}&lon=${long}&appid=${apiKey}`)
    return result.then(response => {
        const weatherData = response.data
        const icon = weatherData.weather[0]['icon']
        weatherData['img'] = `${weatherIconUrl}${icon}@2x.png`
        return weatherData
    })
}

export default { readAll, read, getWeather }