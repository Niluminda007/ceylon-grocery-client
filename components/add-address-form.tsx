"use client";

import * as z from "zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

import { AddressSchema } from "@/schemas/address-schema";
import { fetcher } from "@/lib/fetcher";
import { countries } from "@/constants/countries";

import { ChevronDown, Home, Building, MapPin } from "lucide-react";
import { FaCity } from "react-icons/fa";
import Image from "next/image";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

const AddAddressForm = () => {
  const { update } = useSession();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof AddressSchema>>({
    resolver: zodResolver(AddressSchema),
    defaultValues: {
      streetName: "",
      buildingNumber: "",
      addressLine2: "",
      city: "",
      postalCode: "",
      country: undefined,
    },
    mode: "onChange",
  });

  const { isDirty, isValid } = form.formState;

  const addAddressMutation = useMutation({
    mutationKey: ["update-user"],
    mutationFn: (address: z.infer<typeof AddressSchema>) =>
      fetcher({
        url: "/create/address",
        method: "POST",
        data: { address },
      }),
    onError: (error: any) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Address added successfully");
      setSuccess("Address added successfully!");
      update();
      setTimeout(() => setSuccess(undefined), 3000);
      form.reset();
      queryClient.invalidateQueries({
        queryKey: ["addresses"],
      });
    },
  });

  const onSubmit = (values: z.infer<typeof AddressSchema>) => {
    startTransition(() => {
      if (isDirty) {
        addAddressMutation.mutate(values);
      }
    });
  };

  return (
    <div className="p-8 bg-white border border-gray-200 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <MapPin className="mr-2 text-blue-500" />
        Add a New Address
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="streetName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street Name</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Home className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <Input
                        disabled={isPending || addAddressMutation.isPending}
                        {...field}
                        type="text"
                        autoComplete="street-name"
                        placeholder="Enter your street name"
                        className="pl-10 w-full border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 rounded-md"
                      />
                    </div>
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.streetName?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="buildingNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Building Number</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <Input
                        disabled={isPending || addAddressMutation.isPending}
                        {...field}
                        type="text"
                        autoComplete="building-name"
                        placeholder="Enter your building number"
                        className="pl-10 w-full border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 rounded-md"
                      />
                    </div>
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.buildingNumber?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="addressLine2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address Line 2</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <Input
                        disabled={isPending || addAddressMutation.isPending}
                        {...field}
                        type="text"
                        autoComplete="address-line-two"
                        placeholder="Additional address information (optional)"
                        className="pl-10 w-full border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 rounded-md"
                      />
                    </div>
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.addressLine2?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <FaCity className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <Input
                        disabled={isPending || addAddressMutation.isPending}
                        {...field}
                        type="text"
                        autoComplete="city"
                        placeholder="City"
                        className="pl-10 w-full border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 rounded-md"
                      />
                    </div>
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.city?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="postalCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Postal Code</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <Input
                        disabled={isPending || addAddressMutation.isPending}
                        {...field}
                        type="text"
                        autoComplete="postal-code"
                        placeholder="Enter your postal code"
                        className="pl-10 w-full border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 rounded-md"
                      />
                    </div>
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.postalCode?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem className="flex flex-col justify-between">
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <div
                          role="button"
                          className="w-full px-4 py-2 text-left bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 flex items-center justify-between"
                        >
                          {field.value || "Select a country"}
                          <ChevronDown className="ml-2" />
                        </div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>Select Country</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {countries.map((country, index) => (
                          <DropdownMenuItem
                            key={index}
                            onSelect={() => field.onChange(country.name)}
                          >
                            <div className="flex items-center space-x-2">
                              <Image
                                width={20}
                                height={15}
                                src={country.image}
                                alt={country.name}
                                className="rounded-sm"
                              />
                              <span className="text-sm font-medium text-gray-700">
                                {country.name}
                              </span>
                            </div>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.country?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
          </div>
          {/* Error and Success Messages */}
          {error && <FormError message={error} />}
          {success && <FormSuccess message={success} />}

          <button
            type="submit"
            disabled={isPending || !isValid}
            className="mt-6 w-full py-3 px-6 text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 rounded-md shadow-sm transition-colors duration-200"
          >
            {isPending ? "Submitting..." : "Submit Address"}
          </button>
        </form>
      </Form>
    </div>
  );
};

export default AddAddressForm;
