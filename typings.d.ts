export interface WeatherStats {
  temperature: number;
  description: string;
  city: string;
  lastUpdated: string;
  windSpeed: number;
  weather: {
    main: string;
    icon: string;
  }[];
}

export interface Forecast {
  date: string;
  temperature: number;
  description;
  windSpeed: number;
}

interface CardProps {
  date: string;
  temperature: number;
  description: string;
  windSpeed: number;
  iconSrc: string;
}
