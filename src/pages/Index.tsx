import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { WeatherCard } from "@/components/WeatherCard";
import { ForecastCard } from "@/components/ForecastCard";
import { CitySearch } from "@/components/CitySearch";
import { ApiKeyInput } from "@/components/ApiKeyInput";
import { fetchWeather, fetchForecast } from "@/services/weatherService";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [city, setCity] = useState("London");
  const [apiKey, setApiKey] = useState("");
  const { toast } = useToast();

  const {
    data: weatherData,
    isLoading: weatherLoading,
    error: weatherError,
  } = useQuery({
    queryKey: ["weather", city, apiKey],
    queryFn: () => fetchWeather(city, apiKey),
    enabled: !!apiKey,
  });

  const {
    data: forecastData,
    isLoading: forecastLoading,
    error: forecastError,
  } = useQuery({
    queryKey: ["forecast", city, apiKey],
    queryFn: () => fetchForecast(city, apiKey),
    enabled: !!apiKey,
  });

  const handleSearch = (newCity: string) => {
    if (!apiKey) {
      toast({
        title: "API Key Required",
        description: "Please enter your OpenWeatherMap API key first.",
        variant: "destructive",
      });
      return;
    }
    setCity(newCity);
  };

  const getDayForecast = () => {
    if (!forecastData) return [];
    const dailyData = new Map();
    
    forecastData.list.forEach((item) => {
      const date = new Date(item.dt * 1000).toLocaleDateString();
      if (!dailyData.has(date)) {
        dailyData.set(date, {
          tempMin: item.main.temp_min,
          tempMax: item.main.temp_max,
          icon: item.weather[0].icon,
          description: item.weather[0].main,
        });
      }
    });

    return Array.from(dailyData.entries()).slice(0, 5);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-weather-gradient-start to-weather-gradient-end">
      <div className="container py-8 px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Weather Dashboard</h1>
        
        <div className="max-w-4xl mx-auto space-y-6">
          <ApiKeyInput onApiKeyChange={setApiKey} />
          
          <div className="flex justify-center">
            <CitySearch
              onSearch={handleSearch}
              disabled={!apiKey || weatherLoading}
            />
          </div>

          {!apiKey ? (
            <p className="text-center text-gray-500">
              Please enter your API key to start
            </p>
          ) : weatherError || forecastError ? (
            <p className="text-center text-red-500">
              Error fetching weather data. Please check your API key and try again.
            </p>
          ) : weatherLoading || forecastLoading ? (
            <p className="text-center">Loading weather data...</p>
          ) : weatherData ? (
            <>
              <WeatherCard data={weatherData} />
              
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {getDayForecast().map(([date, data]) => (
                  <ForecastCard
                    key={date}
                    date={date}
                    icon={data.icon}
                    description={data.description}
                    tempMin={data.tempMin}
                    tempMax={data.tempMax}
                  />
                ))}
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Index;