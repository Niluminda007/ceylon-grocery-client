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

const AddressSelection = () => {
  const {
    data: addresses,
    isLoading,
    error,
  } = useQuery<Address[]>({
    queryKey: ["addresses"],
    queryFn: () => fetcher({ url: "/fetch/addresses" }),
  });

  const [selectedAddress, setSelectedAddress] = useState<Address>();
  const router = useRouter();

  const { setData, completeStage, address, setStage } = useCheckOut(
    (state) => ({
      setData: state.setData,
      setStage: state.setStage,
      completeStage: state.completeStage,
      address: state.data.address,
    })
  );

  const open = useAddressModal((state) => state.onOpen);

  const handleOnSelectAddress = (address: Address) => {
    setSelectedAddress(address);
  };

  const handleNextStage = () => {
    if (selectedAddress) {
      setData({ address: selectedAddress });
      completeStage("info");
      router.push("/checkout/delivery");
    }
  };

  useEffect(() => {
    setStage("info");
    if (address) {
      setSelectedAddress(address);
    }
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-8 bg-gradient-to-br from-white to-gray-100 rounded-xl shadow-2xl">
      <h2 className="text-neutral-800 text-3xl font-bold mb-8">
        Choose an Address or Create a New One
      </h2>

      <div className="flex flex-col space-y-4 mb-6">
        <span className="text-neutral-600 font-semibold text-lg">
          Address List
        </span>
        {isLoading && <Loader text="Loading addresses..." />}
        {error && (
          <div className="text-sm text-red-500 font-semibold">
            {error.message}
          </div>
        )}
        {!isLoading && addresses && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div
                role="button"
                className="w-full px-5 py-3 text-left bg-white border border-gray-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                {selectedAddress
                  ? formatAddress(selectedAddress)
                  : "Select an Address"}
                <ChevronDown className="ml-2 text-gray-500" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="max-h-60 overflow-y-auto mt-2 rounded-lg shadow-lg bg-white border border-gray-200">
              <DropdownMenuLabel className="text-gray-600 font-semibold">
                Select an Address
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {addresses.map((address) => (
                <DropdownMenuItem
                  key={address.id}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
                  onClick={() => handleOnSelectAddress(address)}
                >
                  {formatAddress(address)}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
      <div className="flex flex-col space-y-4">
        <span className="text-neutral-600 font-semibold">Add an Address</span>
        <Button
          variant="outline"
          size="lg"
          className="flex items-center justify-center border-gray-300 text-sky-600 hover:border-sky-600 hover:bg-sky-50 transition-colors duration-200"
          onClick={open}
        >
          <PlusIcon className="w-6 h-6 mr-2" />
          Add New Address
        </Button>
      </div>
      <Button
        disabled={!selectedAddress}
        onClick={handleNextStage}
        className="mt-4 w-full p-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-indigo-300"
      >
        Next
      </Button>
    </div>
  );
};

export default AddressSelection;
