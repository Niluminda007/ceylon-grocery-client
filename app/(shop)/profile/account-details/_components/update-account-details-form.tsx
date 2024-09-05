"use client";

import * as z from "zod";
import React, { useState, useTransition } from "react";
import { UpdateAccountDetailsSchema } from "@/schemas/update-account-details-schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { FaPlus } from "react-icons/fa";
import { UserAvatar } from "@/components/user-avatar";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import {
  CldImage,
  CldUploadWidget,
  CloudinaryUploadWidgetError,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { fetcher } from "@/lib/fetcher";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { UserDTO } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";

interface UpdateAccountDetailsFormProps {
  user: UserDTO;
}

const UpdateAccountDetailsForm = ({ user }: UpdateAccountDetailsFormProps) => {
  const form = useForm<z.infer<typeof UpdateAccountDetailsSchema>>({
    resolver: zodResolver(UpdateAccountDetailsSchema),
    defaultValues: {
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      telephone: user.telephone || "",
      email: user.email || "",
    },
    mode: "onChange",
  });

  const { isDirty, isValid } = form.formState;
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [image, setImage] = useState<string | undefined>(undefined);
  const [imageUploading, setImageUploading] = useState<boolean>(false);
  const { update } = useSession();

  const { mutate: updateUserMutation, isPending: isUpdating } = useMutation({
    mutationKey: ["update-user"],
    mutationFn: (user: Partial<User>) =>
      fetcher({
        url: "/update/user",
        method: "POST",
        data: { user },
      }),
    onError: (error: any) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success("User updated successfully");
      setSuccess("Account details updated successfully!");
      update();
    },
  });

  const onSubmit = (values: z.infer<typeof UpdateAccountDetailsSchema>) => {
    startTransition(() => {
      if (isDirty) {
        updateUserMutation({
          ...values,
          name: `${values.firstName} ${values.lastName}`,
        });
        setTimeout(() => setSuccess(undefined), 3000);
        form.reset(values);
      }
    });
  };

  return (
    <div className="p-6 bg-gray-50 border border-gray-200 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold text-gray-700 mb-6">
        Update Account Details
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Profile Image Upload */}
          <div className="flex justify-center mb-6">
            <div className="flex flex-col space-y-2">
              <div className="text-lg font-medium text-neutral-900">
                Profile Image
              </div>
              <div className="relative w-24 h-24 rounded-full border border-gray-300 overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <CldUploadWidget
                  uploadPreset={"ceylon-grocery-preset"}
                  signatureEndpoint={"/api/cloudinary/sign"}
                  onSuccess={(results: CloudinaryUploadWidgetResults) => {
                    if (results && results.info) {
                      //@ts-ignore
                      setImage(results.info.public_id);

                      updateUserMutation({
                        image:
                          //@ts-ignore
                          results.info.secure_url || results.info.url,
                      });
                    }
                  }}
                  onError={(error: CloudinaryUploadWidgetError) => {
                    toast.error(error?.toString());
                  }}
                >
                  {({ open }) => {
                    return (
                      <button
                        disabled={isUpdating}
                        type="button"
                        className="w-8 h-8 absolute right-[10%] top-1/2 z-10 p-1 bg-gray-800 rounded-full cursor-pointer hover:bg-gray-700 transition flex items-center justify-center"
                        onClick={() => open()}
                      >
                        <FaPlus className="text-white text-xs" />
                      </button>
                    );
                  }}
                </CldUploadWidget>
                {imageUploading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-6 h-6 border-4 border-t-4 border-t-gray-200 border-gray-400 rounded-full animate-spin"></div>
                  </div>
                )}
                {image ? (
                  <CldImage
                    width={96}
                    height={96}
                    alt="profile-image"
                    src={image}
                    className="object-cover"
                  />
                ) : (
                  <UserAvatar
                    className="w-[96px] h-[96px]"
                    height={96}
                    width={96}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Name Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending || isUpdating}
                      {...field}
                      type="text"
                      autoComplete="given-name"
                      className="w-full border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 rounded-md"
                    />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.firstName?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending || isUpdating}
                      {...field}
                      type="text"
                      autoComplete="family-name"
                      className="w-full border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 rounded-md"
                    />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.lastName?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="telephone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telephone</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending || isUpdating}
                      {...field}
                      type="tel"
                      autoComplete="tel"
                      className="w-full border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 rounded-md"
                    />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.telephone?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending || isUpdating}
                      {...field}
                      type="email"
                      autoComplete="email"
                      className="w-full border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 rounded-md"
                    />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.email?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
          </div>

          {/* Error and Success Messages */}
          {error && <FormError message={error} />}
          {success && <FormSuccess message={success} />}

          {/* Submit Button */}
          <Button
            type="submit"
            variant={"default"}
            className="w-full"
            disabled={!isDirty || !isValid || isPending || isUpdating}
          >
            {isPending || isUpdating ? "Updating..." : "Update Details"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default UpdateAccountDetailsForm;
