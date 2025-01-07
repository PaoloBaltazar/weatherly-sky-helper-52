const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export interface WeatherData {
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
  name: string;
}

export interface ForecastData {
  list: Array<{
    dt: number;
    main: {
      temp_min: number;
      temp_max: number;
    };
    weather: Array<{
      main: string;
      icon: string;
    }>;
  }>;
}

export const fetchWeather = async (city: string, apiKey: string): Promise<WeatherData> => {
  const response = await fetch(
    `${BASE_URL}/weather?q=${city}&units=metric&appid=${apiKey}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }
  return response.json();
};

export const fetchForecast = async (city: string, apiKey: string): Promise<ForecastData> => {
  const response = await fetch(
    `${BASE_URL}/forecast?q=${city}&units=metric&appid=${apiKey}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch forecast data');
  }
  return response.json();
};