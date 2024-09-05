"use client";

import { fetcher } from "@/lib/fetcher";
import { UpdatePasswordSchema } from "@/schemas/change-password-schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { MdVpnKey } from "react-icons/md";
import { zodResolver } from "@hookform/resolvers/zod";

interface ChangePasswordFormProps {
  hasOldPassword: boolean;
}

const ChangePasswordForm = ({ hasOldPassword }: ChangePasswordFormProps) => {
  const form = useForm<z.infer<typeof UpdatePasswordSchema>>({
    resolver: zodResolver(UpdatePasswordSchema),
    defaultValues: { oldPassword: "", newPassword: "", confirmPassword: "" },
    mode: "onChange",
  });

  const { isDirty, isValid } = form.formState;
  const [isPending, startTransition] = useTransition();

  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const { mutate: updateUserPasswordMutation, isPending: isUpdating } =
    useMutation({
      mutationKey: ["update-user"],
      mutationFn: (data: z.infer<typeof UpdatePasswordSchema>) =>
        fetcher({
          url: "/update/user/password",
          method: "PUT",
          data,
        }),
      onError: (error: any) => {
        let errorMessage = "An error occurred";
        if (error.isAxiosError && error.response) {
          const serverMessage = error.response.data?.message;
          if (serverMessage) {
            errorMessage = serverMessage;
          }
        }

        toast.error(errorMessage);
      },
      onSuccess: () => {
        toast.success("Password updated successfully!");
        form.reset();
      },
    });

  const onSubmit = (values: z.infer<typeof UpdatePasswordSchema>) => {
    startTransition(() => {
      if (isDirty) {
        updateUserPasswordMutation(values);
      }
    });
  };

  const togglePasswordVisibility = (field: keyof typeof showPassword) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <div className="flex flex-col bg-gray-50 p-8 rounded-xl shadow-md">
      <div className="w-full border-b border-gray-300 text-neutral-800 text-xl font-bold pb-4 mb-8 flex items-center">
        <MdVpnKey className="mr-3" />
        Change Password
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {hasOldPassword && (
            <FormField
              control={form.control}
              name="oldPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Old Password</FormLabel>
                  <FormControl>
                    <div className="w-full relative">
                      <Input
                        disabled={isUpdating || isPending}
                        {...field}
                        type={showPassword.oldPassword ? "text" : "password"}
                        autoComplete="off"
                        placeholder="Enter your old password"
                        className="w-full bg-white border-gray-300 text-gray-900 focus:border-sky-500 focus:ring focus:ring-sky-200 rounded-md transition-all duration-300"
                      />
                      <div
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                        onClick={() => togglePasswordVisibility("oldPassword")}
                      >
                        {showPassword.oldPassword ? (
                          <IoMdEyeOff size={24} />
                        ) : (
                          <IoMdEye size={24} />
                        )}
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.oldPassword?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">New Password</FormLabel>
                <FormControl>
                  <div className="w-full relative">
                    <Input
                      disabled={isUpdating || isPending}
                      {...field}
                      type={showPassword.newPassword ? "text" : "password"}
                      autoComplete="off"
                      placeholder="Enter your new password"
                      className="w-full bg-white border-gray-300 text-gray-900 focus:border-sky-500 focus:ring focus:ring-sky-200 rounded-md transition-all duration-300"
                    />
                    <div
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                      onClick={() => togglePasswordVisibility("newPassword")}
                    >
                      {showPassword.newPassword ? (
                        <IoMdEyeOff size={24} />
                      ) : (
                        <IoMdEye size={24} />
                      )}
                    </div>
                  </div>
                </FormControl>
                <FormMessage>
                  {form.formState.errors.newPassword?.message}
                </FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">
                  Confirm Password
                </FormLabel>
                <FormControl>
                  <div className="w-full relative">
                    <Input
                      disabled={isUpdating || isPending}
                      {...field}
                      type={showPassword.confirmPassword ? "text" : "password"}
                      autoComplete="off"
                      placeholder="Confirm your new password"
                      className="w-full bg-white border-gray-300 text-gray-900 focus:border-sky-500 focus:ring focus:ring-sky-200 rounded-md transition-all duration-300"
                    />
                    <div
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                      onClick={() =>
                        togglePasswordVisibility("confirmPassword")
                      }
                    >
                      {showPassword.confirmPassword ? (
                        <IoMdEyeOff size={24} />
                      ) : (
                        <IoMdEye size={24} />
                      )}
                    </div>
                  </div>
                </FormControl>
                <FormMessage>
                  {form.formState.errors.confirmPassword?.message}
                </FormMessage>
              </FormItem>
            )}
          />

          <button
            type="submit"
            disabled={!isDirty || !isValid || isPending || isUpdating}
            className={`mt-4 w-full py-2 rounded-md transition-all duration-300 ${
              !isDirty || !isValid || isPending || isUpdating
                ? "bg-neutral-400 cursor-not-allowed"
                : "bg-sky-700 hover:bg-sky-900 text-white"
            }`}
          >
            {isPending || isUpdating
              ? "Updating password..."
              : "Update Password"}
          </button>
        </form>
      </Form>
    </div>
  );
};

export default ChangePasswordForm;
