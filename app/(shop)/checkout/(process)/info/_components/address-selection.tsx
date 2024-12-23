"use client";

import { fetcher } from "@/lib/fetcher";
import { Address } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React, { useEffect, useState } from "react";
import { ChevronDown, PlusIcon } from "lucide-react";
import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import { useAddressModal } from "@/hooks/use-address-modal";
import { useRouter } from "next/navigation";
import useCheckOut from "@/hooks/use-checkout";
import { formatAddress } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { UserDTO } from "@/types/user";
import { toast } from "sonner";

const AddressForm = () => {
  const {
    data: addresses,
    isLoading,
    error,
  } = useQuery<Address[]>({
    queryKey: ["addresses"],
    queryFn: () => fetcher({ url: "/fetch/addresses" }),
  });

  const {
    data: user,
    isLoading: isUserLoading,
    error: userError,
  } = useQuery<UserDTO>({
    queryKey: ["user-info"],
    queryFn: () => fetcher({ url: "/fetch/user" }),
  });

  const [selectedAddress, setSelectedAddress] = useState<Address>();
  const [selectedTelephone, setSelectedTelephone] = useState<
    string | undefined
  >(undefined);
  const [isInvalidPhone, setIsInvalidPhone] = useState(false);
  const router = useRouter();

  const { setData, completeStage, address, setStage } = useCheckOut(
    (state) => ({
      setData: state.setData,
      setStage: state.setStage,
      completeStage: state.completeStage,
      address: state.data.address,
    })
  );

  const openAddressModal = useAddressModal((state) => state.onOpen);

  const handleOnSelectAddress = (address: Address) => {
    setSelectedAddress(address);
  };

  const handleNextStage = () => {
    const phoneRegex = /^(\+?\d{1,3})?\d{6,12}$/;
    if (
      selectedAddress &&
      selectedTelephone &&
      phoneRegex.test(selectedTelephone)
    ) {
      setData({ address: selectedAddress, telephone: selectedTelephone });
      completeStage("info");
      router.push("/checkout/delivery");
    } else {
      setIsInvalidPhone(true);
      toast.error("Please enter a valid telephone number");
    }
  };

  useEffect(() => {
    setStage("info");
    if (address) setSelectedAddress(address);
    if (user && user.telephone) setSelectedTelephone(user.telephone);
  }, [address, user, setStage]);

  return (
    <div className="max-w-xl mx-auto p-8 bg-white rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-gray-800 text-3xl font-bold mb-6">
        Select or Create an Address
      </h2>

      {/* Address Dropdown */}
      <div className="mb-6">
        <label className="block text-gray-600 font-semibold mb-2">
          Address List
        </label>
        {isLoading && <Loader text="Loading addresses..." />}
        {error && <p className="text-red-500">{error.message}</p>}
        {!isLoading && addresses && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="w-full px-4 py-3 text-left bg-gray-50 border rounded-lg shadow-sm hover:shadow-md transition flex items-center justify-between">
                <span>
                  {selectedAddress
                    ? formatAddress(selectedAddress)
                    : "Select an Address"}
                </span>
                <ChevronDown className="w-5 h-5 ml-2 text-gray-500" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="max-h-60 overflow-y-auto mt-1 rounded-lg shadow-lg bg-white border">
              <DropdownMenuLabel className="text-gray-700 font-semibold px-4 py-2">
                Select an Address
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {addresses.map((address) => (
                <DropdownMenuItem
                  key={address.id}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleOnSelectAddress(address)}
                >
                  {formatAddress(address)}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      {/* Add Address Button */}
      <div className="mb-6 flex items-center gap-4">
        <span className="text-gray-600 font-semibold">Add New Address</span>
        <Button
          variant="outline"
          size="lg"
          className="flex items-center border-gray-300 text-blue-600 hover:border-blue-600 hover:bg-blue-50 transition"
          onClick={openAddressModal}
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Add Address
        </Button>
      </div>

      {/* Telephone Input */}
      <div className="space-y-4 mt-6">
        <span className="text-gray-600 font-semibold">Telephone Number</span>
        <p className="text-gray-500 text-sm">e.g. +123 4567890 or 4567890</p>
        <Input
          type="tel"
          placeholder="Enter your phone number"
          value={selectedTelephone}
          onChange={(e) => {
            setSelectedTelephone(e.target.value);
            setIsInvalidPhone(false);
          }}
          className={`w-full rounded-lg placeholder-gray-400 text-gray-800 ${
            isInvalidPhone ? "border-red-500" : ""
          }`}
        />
      </div>

      {/* Continue Button */}
      <Button
        disabled={!selectedAddress || !selectedTelephone}
        onClick={handleNextStage}
        className="mt-6 w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300"
      >
        Continue
      </Button>
    </div>
  );
};

export default AddressForm;
