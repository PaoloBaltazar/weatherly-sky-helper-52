import { Input } from "./ui/input";

interface CitySearchProps {
  onSearch: (city: string) => void;
  disabled?: boolean;
}

export const CitySearch = ({ onSearch, disabled }: CitySearchProps) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const input = form.elements.namedItem("city") as HTMLInputElement;
        onSearch(input.value);
      }}
      className="w-full max-w-md"
    >
      <Input
        name="city"
        placeholder="Enter city name..."
        disabled={disabled}
        className="w-full"
      />
    </form>
  );
};