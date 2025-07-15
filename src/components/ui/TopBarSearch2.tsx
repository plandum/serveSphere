import { useState } from "react";
import { Input } from "@/components/ui";
import { useNavigate } from "react-router-dom";

const TopbarSearch2 = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() !== "") {
      navigate(`/search?query=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center gap-2 bg-[#F0F0F0] rounded-[80px] px-3 py-2 max-w-[350px] w-full h-[38px]">
      <img
        src="/assets/icons/search.svg"
        alt="search"
        width={24}
        height={24}
        className="opacity-40"
      />
      <Input
        type="text"
        placeholder="Поиск..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="bg-transparent border-none outline-none focus:ring-0 text-sm focus-visible:ring-offset-0 focus-visible:ring-0"
      />
    </form>
  );
};

export default TopbarSearch2;
