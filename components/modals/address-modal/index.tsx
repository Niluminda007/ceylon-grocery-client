"use client";

import AddAddressForm from "@/components/add-address-form";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useAddressModal } from "@/hooks/use-address-modal";

const AddressModal = () => {
  const { isOpen, onClose } = useAddressModal((state) => ({
    isOpen: state.isOpen,
    onClose: state.onClose,
  }));

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="
          max-w-4xl 
          w-[90%] 
          sm:w-[95%] 
          h-[90vh] 
          max-h-[90vh] 
          overflow-y-auto 
          p-6 
          flex flex-col 
          shadow-2xl 
          border-none 
          rounded-2xl 
          bg-gradient-to-br 
          from-white via-gray-50 to-gray-100"
      >
        <DialogHeader className="flex justify-between items-center border-b pb-6 mb-6">
          <DialogTitle className="text-3xl font-bold text-gray-900 tracking-tight">
            Address Form
          </DialogTitle>
          <DialogClose
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
          />
        </DialogHeader>
        <DialogDescription className="text-lg text-gray-700 mb-6">
          Please fill out the form below to add a new address to your account.
        </DialogDescription>
        <div className="flex-1 overflow-y-auto">
          <AddAddressForm />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddressModal;
