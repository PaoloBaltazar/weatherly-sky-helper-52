import { Card } from "./ui/card";

interface ForecastCardProps {
  date: string;
  icon: string;
  description: string;
  tempMin: number;
  tempMax: number;
}

export const ForecastCard = ({
  date,
  icon,
  description,
  tempMin,
  tempMax,
}: ForecastCardProps) => {
  return (
    <Card className="p-4 bg-white/80 backdrop-blur animate-slide-up">
      <div className="flex flex-col items-center">
        <p className="text-sm font-medium">{date}</p>
        <img
          src={`https://openweathermap.org/img/wn/${icon}.png`}
          alt={description}
          className="w-12 h-12"
        />
        <div className="flex gap-2 text-sm">
          <span className="font-semibold">{Math.round(tempMax)}°</span>
          <span className="text-gray-500">{Math.round(tempMin)}°</span>
        </div>
      </div>
    </Card>
  );
};