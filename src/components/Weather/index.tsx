import { useState, useEffect } from "react";
import { WeatherStats, Forecast } from "../../../typings";
import styles from "../../styles/Home.module.css";

//COMPONENTS
import Card from "../Cards";

//ICONS
import cloudyIcon from "../../../public/icons/cloudy-icon.svg";
import lightRainIcon from "../../../public/icons/light-rain-icon.svg";
import partlyCloudyIcon from "../../../public/icons/partly-cloudy-icon.svg";
import rainIcon from "../../../public/icons/rain-icon.svg";
import snowIcon from "../../../public/icons/snow-icon.svg";
import sunnyIcon from "../../../public/icons/sunny-icon.svg";
import thunderIcon from "../../../public/icons/thunder-icon.svg";

const Weather: React.FC = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<WeatherStats | null>(null);
  const [forecast, setForecast] = useState<Forecast[]>([]);

  const API_KEY = process.env.NEXT_PUBLIC_API;
  const CURRENT_WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&units=metric&q=`;
  const FORECAST_API_URL = `https://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}&units=metric&q=`;

  useEffect(() => {
    if (!weather) return;
    console.log("Weather:", weather);
  }, [weather]);

  const fetchWeather = async () => {
    try {
      const response = await fetch(CURRENT_WEATHER_API_URL + city);
      if (!response.ok) throw new Error("City was not found");

      const data = await response.json();
      const currentDate = new Date(data.dt * 1000);
      const format = currentDate.toLocaleString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });

      setWeather({
        temperature: data.main.temp,
        description: data.weather[0].description,
        city: data.name,
        lastUpdated: format,
        windSpeed: data.wind.speed,
        weather: data.weather,
      });
    } catch (error) {
      console.error(error);
      setWeather(null);
    }
  };

  const fetchForecast = async () => {
    try {
      const response = await fetch(FORECAST_API_URL + city);
      if (!response.ok) throw new Error("Forecast data not available");

      const data = await response.json();
      const ForecastGroup: { [date: string]: Forecast } = {};

      data.list.forEach((item: any) => {
        const date = new Date(item.dt * 1000).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });
        if (!ForecastGroup[date]) {
          ForecastGroup[date] = {
            date,
            temperature: item.main.temp,
            description: item.weather[0].description,
            windSpeed: item.wind.speed,
          };
        } else {
          if (item.wind.speed > ForecastGroup[date].windSpeed) {
            ForecastGroup[date].windSpeed = item.wind.speed;
          }
        }
      });

      const forecasts = Object.values(ForecastGroup);
      setForecast(forecasts);
    } catch (error) {
      console.error(error);
      setForecast([]);
    }
  };

  const handleSearch = async () => {
    if (!city.trim()) return;
    await fetchWeather();
    await fetchForecast();
  };

  const Icon: { [key: string]: string } = {
    "clear sky": sunnyIcon,
    "few clouds": partlyCloudyIcon,
    "scattered clouds": cloudyIcon,
    "broken clouds": cloudyIcon,
    "shower rain": lightRainIcon,
    "rain": rainIcon,
    "thunderstorm": thunderIcon,
    "snow": snowIcon,
    "light snow": snowIcon,
    "mist": lightRainIcon,
    "light rain": lightRainIcon,
    "overcast clouds": partlyCloudyIcon,
  };

  return (
    <div className={styles.weatherContainer}>

      <div className={styles.input_container}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {weather && (
        <div className={styles.weatherDetails}>
          <h2>{weather.city}</h2>
          <p className={styles.temp}>{weather.temperature.toFixed(0)}°</p>
          <p className={styles.desc}>{weather.description}</p>
          <p className={styles.update}>Last Updated: {weather.lastUpdated}</p>
          {weather.windSpeed && <p className={styles.windspeed}>Wind Speed: {weather.windSpeed} km/s</p>}

          <h3 style={{ marginTop: "3em" }}>5 Day Forecast</h3>
          <div className={styles.forecastContainer}>
            {forecast.map((item, index) => {
              const weatherDescription = item.description.toLowerCase();
              const iconSrc = Icon[weatherDescription];
              return (
                <Card
                  key={index}
                  date={item.date}
                  temperature={item.temperature}
                  description={item.description}
                  windSpeed={item.windSpeed}
                  iconSrc={iconSrc}
                />
              );
            })}
          </div>

        </div>
      )}
    </div>
  );
};

export default Weather;