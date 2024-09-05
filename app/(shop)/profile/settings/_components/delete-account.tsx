"use client";

import { logout } from "@/actions/logout";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { fetcher } from "@/lib/fetcher";
import { useMutation } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import { toast } from "sonner";

const DeleteAccount = () => {
  const {
    mutate: deleteAccountMutation,
    isPending,
    error,
  } = useMutation({
    mutationKey: ["delete-account"],
    mutationFn: () => fetcher({ url: "/delete/account", method: "DELETE" }),
    onSuccess: async (data) => {
      await logout();
    },
    onError: (error) => {
      const errorMessage = error?.message || "An unexpected error occurred.";
      toast.error(errorMessage);
    },
  });
  const handleDeleteAccount = () => {
    deleteAccountMutation();
  };

  return (
    <div className="flex flex-col bg-red-50 p-8 rounded-xl shadow-md">
      <div className="w-full border-b border-gray-300 text-neutral-800 text-xl font-bold pb-4 mb-4 flex items-center">
        <Trash className="mr-3" />
        Delete Account
      </div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant={"destructive"}
            size={"lg"}
            className="w-full"
            disabled={isPending}
          >
            Delete Account
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteAccount}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DeleteAccount;
