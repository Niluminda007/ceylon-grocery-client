// "use client";

// import { FaUserCircle } from "react-icons/fa";
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
// import { useCurrentUser } from "@/hooks/use-current-user";
// import { generateInitials } from "@/lib/utils";

// interface UserAvatarProps {
//   className?: string;
// }

// export const UserAvatar = ({ className }: UserAvatarProps) => {
//   const user = useCurrentUser();

//   return (
//     <Avatar className={`w-[96px] h-[96px] text-xl ${className}`}>
//       <AvatarImage
//         src={user?.image || ""}
//         alt={user?.name || "User Avatar"}
//         className="rounded-full"
//       />
//       <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
//         {user && user.name ? (
//           <div className="flex items-center justify-center h-full text-white ">
//             {generateInitials(user.name)}
//           </div>
//         ) : (
//           <FaUserCircle className="text-white text-4xl" />
//         )}
//       </AvatarFallback>
//     </Avatar>
//   );
// };

"use client";

import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";
import { useCurrentUser } from "@/hooks/use-current-user";
import { generateInitials } from "@/lib/utils";
import { useState } from "react";

interface UserAvatarProps {
  className?: string;
  height: number;
  width: number;
}

export const UserAvatar = ({
  className,
  width = 48,
  height = 48,
}: UserAvatarProps) => {
  const user = useCurrentUser();
  const [imageError, setImageError] = useState(false);

  return (
    <div
      className={`relative text-xl rounded-full overflow-hidden ${className}`}
    >
      {user && user.image && !imageError ? (
        <Image
          src={user.image}
          alt={user.name || "User Avatar"}
          width={width}
          height={height}
          className="rounded-full object-cover"
          onError={() => setImageError(true)}
        />
      ) : user && user.name ? (
        <div className="flex items-center justify-center h-full bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full">
          {generateInitials(user.name)}
        </div>
      ) : (
        <div className="flex items-center justify-center h-full bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full">
          <FaUserCircle className="text-4xl" />
        </div>
      )}
    </div>
  );
};
