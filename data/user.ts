import { db } from "@/lib/db";
import { UserDTO } from "@/types/user";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  } catch (error) {
    return null;
  }
};

export const getUserByID = async (id: string | undefined) => {
  if (id === undefined) {
    return null;
  }
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  } catch (error) {
    return null;
  }
};

export const getUserDTOByID = async (
  id: string | undefined
): Promise<UserDTO | null> => {
  if (id === undefined) {
    return null;
  }
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
      select: {
        name: true,
        email: true,
        telephone: true,
      },
    });

    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};

export const doesUserHavePassword = async (id: string): Promise<boolean> => {
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });

    return !!user?.password;
  } catch (error) {
    console.error(error);
    return false;
  }
};
