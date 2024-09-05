"use client";

import { UserAvatar } from "@/components/user-avatar";
import { useUserSideBar } from "@/hooks/use-user-sidebar";

const UserAction = () => {
  const opeUserSidebar = useUserSideBar((state) => state.onOpen);
  return (
    <div
      onClick={() => opeUserSidebar()}
      className="relative cursor-pointer"
      role="button"
      title="User Profile"
    >
      <UserAvatar
        height={40}
        width={40}
        className="w-10 h-10 shadow-none hover:shadow-md"
      />
    </div>
  );
};

export default UserAction;
