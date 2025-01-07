import { WeatherData } from "@/services/weatherService";
import { Card } from "./ui/card";

interface WeatherCardProps {
  data: WeatherData;
}

export const WeatherCard = ({ data }: WeatherCardProps) => {
  return (
    <Card className="p-6 bg-white/80 backdrop-blur animate-fade-in">
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-2">{data.name}</h2>
        <img
          src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
          alt={data.weather[0].description}
          className="w-24 h-24"
        />
        <p className="text-4xl font-bold mb-4">
          {Math.round(data.main.temp)}°C
        </p>
        <p className="text-lg text-gray-700 capitalize mb-4">
          {data.weather[0].description}
        </p>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="text-center">
            <p className="text-gray-500">Feels Like</p>
            <p className="font-semibold">{Math.round(data.main.feels_like)}°C</p>
          </div>
          <div className="text-center">
            <p className="text-gray-500">Humidity</p>
            <p className="font-semibold">{data.main.humidity}%</p>
          </div>
          <div className="text-center">
            <p className="text-gray-500">Wind Speed</p>
            <p className="font-semibold">{data.wind.speed} m/s</p>
          </div>
          <div className="text-center">
            <p className="text-gray-500">Pressure</p>
            <p className="font-semibold">{data.main.pressure} hPa</p>
          </div>
        </div>
      </div>
    </Card>
  );
};