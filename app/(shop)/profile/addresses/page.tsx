import { MdHouse } from "react-icons/md";

import AddressList from "./_components/address-list";
import AddAddressForm from "@/components/add-address-form";

const AddressesPage = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-gradient-to-r from-blue-50 via-white to-blue-50 shadow-2xl rounded-xl">
      <div className="text-4xl text-gray-900 font-bold flex items-center mb-10">
        <MdHouse className="text-blue-600 mr-4" />
        Manage Your Addresses
      </div>
      <AddAddressForm />
      <AddressList />
    </div>
  );
};

export default AddressesPage;
