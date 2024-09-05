import { FaFileDownload, FaListAlt } from "react-icons/fa";
import { cookies } from "next/headers";
import Link from "next/link";

const CheckoutSuccessPage = () => {
  const orderId = cookies().get("order-id")?.value;

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center bg-gradient-to-b from-blue-50 to-white rounded-lg p-10 shadow-lg space-y-8">
      <h1 className="text-4xl font-extrabold text-center text-neutral-800">
        Order Complete!
      </h1>
      <p className="text-lg text-center text-gray-700">
        Thank you for your purchase! Your order is on its way. You can view your
        invoice below or check your orders.
      </p>
      {orderId && (
        <>
          <div className="flex flex-col md:flex-row justify-center items-center gap-4">
            <Link
              href={`/profile/orders/${orderId}/invoice`}
              className="flex items-center justify-center px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-lg shadow-md transition-transform transform hover:scale-105"
              aria-label="View Invoice"
            >
              <FaFileDownload className="mr-2" />
              View Invoice
            </Link>

            <Link
              href="/profile/orders"
              className="flex items-center justify-center px-6 py-3 rounded-full bg-gray-600 hover:bg-gray-700 text-white text-lg shadow-md transition-transform transform hover:scale-105"
              aria-label="View My Orders"
            >
              <FaListAlt className="mr-2" />
              My Orders
            </Link>
          </div>

          <div className="w-full flex flex-col items-center space-y-4 mt-8">
            <h2 className="text-2xl font-bold text-gray-800">
              We Value Your Feedback
            </h2>
            <p className="text-sm text-gray-600 text-center">
              Help us improve by rating your overall experience.
            </p>
            <Link
              href={`/profile/feedback`}
              className="px-6 py-3 rounded-full bg-green-600 hover:bg-green-700 text-white text-lg shadow-md transition-transform transform hover:scale-105"
            >
              Leave us a feedback
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default CheckoutSuccessPage;
