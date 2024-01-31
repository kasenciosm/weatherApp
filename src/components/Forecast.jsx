
const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

const Forecast = ({ data }) => {
    const dayInAWeek = new Date().getDay();
    const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(WEEK_DAYS.slice(0, dayInAWeek));
    // console.log("data: ", data.list)
    return (
        <section>
            {!data ?
                <h1 className="init-title">Busca el clima de tu ciudad</h1> :
                <div className="days">
                    {data.list.splice(0, 7).map((item, index) => (
                        <h3 className="day" key={index}>
                            <div>
                                <p>{forecastDays[index]}</p>
                            </div>
                            <div className="temp">
                                <span>{Math.round(item.main.temp_max)}°C /{Math.round(item.main.temp_min)}°C</span>
                            </div>
                            <div>
                                <span>{item.weather[0].description}</span>
                            </div>
                            <div className="humidity">
                                <span>{item.main.humidity}</span>
                                <span>Humidity</span>
                            </div>
                            <div className="wind">
                                <span>{item.wind.speed}</span>
                                <span>wind</span>
                            </div>
                        </h3>
                    ))}
                </div>
            }
        </section>
    )
}

export default Forecast