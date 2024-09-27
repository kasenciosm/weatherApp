import { useState } from 'react'
import CurrentWeather from './CurrentWeather'
import { WEATHER_API_KEY } from './api/api'
import Forecast from './Forecast'
import WolrdmapIcon from './WolrdmapIcon'

const Search = () => {
    const [data, setData] = useState({})
    const [location, setLocation] = useState('')
    const [forecast, setForecast] = useState(null)

    const searchLocation = async (event) => {
        try {
            if (event.key === 'Enter') {
                const currentWeatherFetch = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${WEATHER_API_KEY}`
                )

                const forecastFetch = await fetch(
                    `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=${WEATHER_API_KEY}`
                )


                Promise.all([currentWeatherFetch, forecastFetch])
                    .then(async (response) => {
                        const weatherResponse = await response[0].json()
                        const forecastResponse = await response[1].json()

                        setData(weatherResponse)
                        setForecast(forecastResponse || null)

                    })
                setLocation('')
            }
        } catch (error) {
            console.error(error)
        }
    }


    console.log("respuesta", data)
    if (forecast == null) {
        return (
            <main className='inicio'>
                <div className="search">
                    <input
                        value={location}
                        onChange={event => setLocation(event.target.value)}
                        onKeyDown={searchLocation}
                        placeholder='Enter Location'
                        type="text" />
                </div>
                <h2 className='title'>Busca el clima de tu ciudad</h2>
                <WolrdmapIcon/>
            </main>
        )
    } else {

        return (
            <section>
                <div className="search">
                    <input
                        value={location}
                        onChange={event => setLocation(event.target.value)}
                        onKeyDown={searchLocation}
                        placeholder='Enter Location'
                        type="text" />
                </div>

                <div className="container">
                    <CurrentWeather data={data} />
                    <Forecast
                        data={forecast} />
                    {/* } */}
                </div>
            </section>
        )
    }
}

export default Search