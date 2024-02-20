
const CurrentWeather = ({ data }) => {
    return (
        <>
            <div className="top">
                <div className="location">
                    <p>{data.name} - {data.sys?.country}</p>
                </div>
                <div className="temp">
                    {data.main ? <h1>{Math.round(data.main.temp.toFixed())}°C</h1> : null}
                </div>
                <div className="description">
                    {data.weather ? <p>{data.weather[0].main}</p> : null}
                </div>
            </div>
            {data.name !== undefined &&
                <div className="bottom">
                    <div className="feels">
                        {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°C</p> : null}
                        <p>Feels Like</p>
                    </div>
                    <div className="humidity">
                        {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
                        <p>Humidity</p>
                    </div>
                    <div className="wind">
                        {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p> : null}
                        <p>Wind Speed</p>
                    </div>
                </div>
            }
        </>
    )
}

export default CurrentWeather