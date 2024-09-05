import { MdSettings } from "react-icons/md";
import ChangePasswordForm from "./_components/change-password-form";
import DeleteAccount from "./_components/delete-account";
import { currentUser } from "@/lib/auth";
import { doesUserHavePassword } from "@/data/user";

const SettingsPage = async (): Promise<JSX.Element | null> => {
  try {
    const user = await currentUser();
    if (!user || !user.id) {
      return null;
    }

    const hasOldPassword = await doesUserHavePassword(user.id);

    return (
      <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-xl">
        <div className="text-3xl text-gray-900 font-semibold flex items-center mb-10">
          <MdSettings className="text-sky-700 mr-3" />
          Settings
        </div>

        <div className="flex flex-col space-y-6">
          <ChangePasswordForm hasOldPassword={hasOldPassword} />
          <DeleteAccount />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error loading settings page:", error);
    return null;
  }
};

export default SettingsPage;
