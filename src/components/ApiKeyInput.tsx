import { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";

interface ApiKeyInputProps {
  onApiKeyChange: (apiKey: string) => void;
}

export const ApiKeyInput = ({ onApiKeyChange }: ApiKeyInputProps) => {
  const [apiKey, setApiKey] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const savedApiKey = localStorage.getItem("weatherApiKey");
    if (savedApiKey) {
      setApiKey(savedApiKey);
      onApiKeyChange(savedApiKey);
    }
  }, [onApiKeyChange]);

  const handleSave = () => {
    localStorage.setItem("weatherApiKey", apiKey);
    onApiKeyChange(apiKey);
    toast({
      title: "API Key Saved",
      description: "Your OpenWeatherMap API key has been saved.",
    });
  };

  return (
    <div className="flex flex-col gap-2 p-4 bg-white rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold">OpenWeatherMap API Key</h2>
      <div className="flex gap-2">
        <Input
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Enter your API key"
          className="flex-1"
        />
        <Button onClick={handleSave}>Save Key</Button>
      </div>
      <p className="text-sm text-gray-500">
        Get your API key from{" "}
        <a
          href="https://home.openweathermap.org/api_keys"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          OpenWeatherMap
        </a>
      </p>
    </div>
  );
};