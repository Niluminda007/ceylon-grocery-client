"use client";

import { UserAvatar } from "@/components/user-avatar";
import { useUserSideBar } from "@/hooks/use-user-sidebar";
import { FaUser } from "react-icons/fa6";

const UserAction = () => {
  const opeUserSidebar = useUserSideBar((state) => state.onOpen);
  return (
    <div
      onClick={() => opeUserSidebar()}
      className="relative cursor-pointer"
      role="button"
      title="User Profile"
    >
      <UserAvatar className="w-10 h-10 shadow-none hover:shadow-md" />
    </div>
  );
};

export default UserAction;
