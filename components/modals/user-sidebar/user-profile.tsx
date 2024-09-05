"use client";

import { UserAvatar } from "@/components/user-avatar";
import { useCurrentUser } from "@/hooks/use-current-user";

const UserProfile = () => {
  const user = useCurrentUser();
  const shouldShowUserDetails = user && user.email && user.name;

  return (
    <div className="w-full text-center">
      <UserAvatar
        height={96}
        width={96}
        className="w-24 h-24 text-4xl rounded-full mx-auto shadow-md"
      />
      {shouldShowUserDetails && (
        <div className="mt-4">
          <span className="block text-lg font-semibold text-gray-800">
            {user.name}
          </span>
          <span className="block text-sm text-gray-500">{user.email}</span>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
