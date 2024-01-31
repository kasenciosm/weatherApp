import { useState } from 'react'
import CurrentWeather from './CurrentWeather'
import { WEATHER_API_KEY } from './api/api'
import Forecast from './Forecast'

const Search = () => {
    const [data, setData] = useState({})
    const [location, setLocation] = useState('')
    const [forecast, setForecast] = useState(null)
    const [error, setError] = useState(false)

    const searchLocation = (event) => {
        try {
            if (event.key === 'Enter') {
                const currentWeatherFecth = fetch(
                    `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${WEATHER_API_KEY}`
                )
                const forecastFetch = fetch(
                    `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=${WEATHER_API_KEY}`
                )

                Promise.all([currentWeatherFecth, forecastFetch])
                    .then(async (response) => {
                        const weatherResponse = await response[0].json()
                        const forecastResponse = await response[1].json()

                        setData(weatherResponse)
                        setForecast(forecastResponse)
                    })

                setLocation('')
            }
        } catch (error) {
            setError(error)
        }
    }
    console.log(forecast, "forecast")
    return (
        <>
            <div className="search">
                <input
                    value={location}
                    onChange={event => setLocation(event.target.value)}
                    onKeyDown={searchLocation}
                    placeholder='Enter Location'
                    type="text" />
            </div>
            {error && <p>{error.message}</p>}
            <div className="container">
                <CurrentWeather data={data} />
                <Forecast
                    data={forecast} />
            </div>
            <div className='forecast'>
            </div>
        </>
    )
}

export default Search