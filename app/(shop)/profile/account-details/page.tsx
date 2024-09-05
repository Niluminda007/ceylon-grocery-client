"use client";

import { MdManageAccounts } from "react-icons/md";
import UpdateAccountDetailsForm from "./_components/update-account-details-form";
import { useQuery } from "@tanstack/react-query";
import { UserDTO } from "@/types/user";
import { fetcher } from "@/lib/fetcher";
import Loader from "@/components/loader";

const AccountDetailsPage = () => {
  const {
    data: user,
    isLoading,
    error,
  } = useQuery<UserDTO>({
    queryKey: ["user"],
    queryFn: () => fetcher({ url: "/fetch/user" }),
  });
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <div className="text-3xl text-gray-800 font-semibold flex items-center mb-8">
        <MdManageAccounts className="text-blue-500 mr-3" />
        Manage Your Account
      </div>
      {!user && isLoading && <Loader />}
      {error && (
        <div className="text-lg font-medium text-red-500">{error.message}</div>
      )}
      {user && !isLoading && <UpdateAccountDetailsForm user={user} />}
    </div>
  );
};

export default AccountDetailsPage;
