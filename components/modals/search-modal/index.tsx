"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useSearchModal } from "@/hooks/use-search-modal";
import { SearchBar } from "./_components/search-bar";

const SearchModal = () => {
  const { isOpen, onClose } = useSearchModal((state) => ({
    isOpen: state.isOpen,
    onClose: state.onClose,
  }));

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl  p-10  flex flex-col shadow-2xl border-none rounded-2xl bg-white bg-opacity-95">
        <DialogHeader className="flex justify-between items-center border-b pb-6 mb-6">
          <DialogTitle className="text-4xl font-bold text-black tracking-tight">
            Search
          </DialogTitle>
          <DialogClose
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 transition-colors duration-200"
          />
        </DialogHeader>
        <DialogDescription className="text-lg text-gray-600 mb-6">
          Type a keyword to begin your search
        </DialogDescription>
        <SearchBar />
      </DialogContent>
    </Dialog>
  );
};

export default SearchModal;
