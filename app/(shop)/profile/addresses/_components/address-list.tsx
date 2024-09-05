"use client";

import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import { fetcher } from "@/lib/fetcher";
import { Address } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FaTrash } from "react-icons/fa";
import { toast } from "sonner";

const AddressList = () => {
  const {
    data: addresses,
    isLoading,
    error,
  } = useQuery<Address[]>({
    queryKey: ["addresses"],
    queryFn: () => fetcher({ url: "/fetch/addresses" }),
  });

  const queryClient = useQueryClient();

  const deleteAddressMutation = useMutation({
    mutationKey: ["delete-address"],
    mutationFn: (addressId: string) =>
      fetcher({
        url: "/delete/address",
        method: "DELETE",
        params: { addressId: addressId },
      }),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("address deleted");
      queryClient.invalidateQueries({
        queryKey: ["addresses"],
      });
    },
  });

  const handleDelete = (id: string) => {
    deleteAddressMutation.mutate(id);
  };

  return (
    <div className="mt-10 flex flex-col space-y-6 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800">Address List</h2>
      {isLoading && <Loader text="Loading addresses..." />}
      {error && (
        <div className="text-sm text-red-500 font-semibold">
          {error.message}
        </div>
      )}
      {!isLoading && addresses && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {addresses.map(
            ({
              id,
              streetName,
              buildingNumber,
              addressLine2,
              city,
              postalCode,
              country,
            }) => (
              <div
                key={id}
                className="flex flex-col justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex-grow">
                  <span className="block text-lg font-semibold text-gray-900">{`${streetName}, ${buildingNumber}`}</span>
                  {addressLine2 && (
                    <span className="block text-sm text-gray-600">
                      {addressLine2}
                    </span>
                  )}
                  <span className="block text-sm text-gray-600">{`${city}, ${postalCode}`}</span>
                  <span className="block text-sm text-gray-600">{country}</span>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  className="mt-4 w-full flex justify-center items-center space-x-2"
                  onClick={() => handleDelete(id)}
                >
                  <FaTrash className="text-white" />
                  <span>Delete</span>
                </Button>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default AddressList;
