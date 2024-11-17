"use client";

import { useSearchModal } from "@/hooks/use-search-modal";
import { FaSearch } from "react-icons/fa";

const SearchButton = () => {
  const onOpen = useSearchModal((state) => state.onOpen);
  return (
    <div className="flex items-center">
      <button
        className="bg-neutral-900 sm:bg-neutral-600 text-white p-4 sm:p-2 rounded-full shadow-md transition-all duration-300 ease-out transform hover:bg-neutral-800 hover:scale-110 hover:shadow-lg hover:rotate-12"
        aria-label="Search"
        onClick={() => onOpen()}
      >
        <FaSearch />
      </button>
    </div>
  );
};

export default SearchButton;
