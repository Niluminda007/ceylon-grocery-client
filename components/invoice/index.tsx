import Logo from "@/components/logo";
import { useRef, useState } from "react";
import Image from "next/image";
import { FaDownload, FaSpinner } from "react-icons/fa";
import { ExtendedOrder } from "@/types/order";
import { decimalToNumber, formatAddress } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { OrdersTable } from "./orders-table";
import { generateInvoice } from "@/lib/generate-invoice";

interface InvoiceProps {
  order: ExtendedOrder;
}

const Invoice = ({ order }: InvoiceProps) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const invoiceRef = useRef<HTMLDivElement>(null);

  const handleInvoiceDownload = async () => {
    if (typeof window === "undefined") return;
    if (invoiceRef.current) {
      try {
        setIsDownloading(true);
        const pdfBlob = await generateInvoice(invoiceRef);
        if (pdfBlob) {
          const url = URL.createObjectURL(pdfBlob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "ceylon_grocery_invoice.pdf";
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsDownloading(false);
      }
    }
  };

  const customerName = order && order.user ? order.user.name : "";
  const deliveryAddress =
    order && order.address ? formatAddress(order.address) : "";

  const deliveryDate =
    order &&
    order.deliveryOption &&
    new Date(
      new Date(order.createdAt).getTime() +
        order.deliveryOption.days * 24 * 60 * 60 * 1000
    ).toLocaleDateString();
  return (
    <>
      <Button
        className={`fixed bottom-8 right-8 z-50 bg-emerald-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-emerald-700 transition duration-200 ease-in-out flex items-center justify-center ${
          isDownloading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={isDownloading}
        onClick={handleInvoiceDownload}
      >
        {isDownloading ? (
          <FaSpinner className="animate-spin mr-2" size={20} />
        ) : (
          <FaDownload className="mr-2" size={20} />
        )}
        {isDownloading ? "Downloading..." : "Download Invoice"}
      </Button>

      {/* Invoice Container */}
      <div
        ref={invoiceRef}
        className="pdf-invoice max-w-[800px] mx-auto p-6 bg-white shadow-lg rounded-lg relative overflow-hidden"
      >
        {/* Header Section */}
        <div className="flex justify-between items-center mb-4">
          <Logo className="w-24 h-24" />
          <div className="text-right">
            <h1 className="text-2xl font-bold text-gray-700">
              Ceylon Grocery Invoice
            </h1>
            <div className="mt-2 text-sm text-gray-600">
              <div>
                <span className="font-semibold">Invoice Number: </span>
                {order.invoice?.invoiceNumber}
              </div>
              {customerName && (
                <div>
                  <span className="font-semibold">Customer Name: </span>
                  {customerName}
                </div>
              )}
              {deliveryAddress && (
                <div className="mt-2">
                  <span className="font-semibold">Delivery Address: </span>
                  {deliveryAddress}
                </div>
              )}
              {deliveryDate && (
                <div className="mt-2">
                  <span className="font-semibold">
                    Expected Delivery Date:{" "}
                  </span>
                  {deliveryDate}
                </div>
              )}
              <div>{`(Monday & Thursday 8pm to 10pm)`}</div>

              <div>
                <span className="font-semibold">Invoice Date: </span>
                {new Date(order.invoice!.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>

        {/* Bank Details Section */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-700 underline mb-2">
            Bank Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {order.paymentMethod?.bankAccounts.map(
              ({ id, bankName, accountName, accountNumber, bic }) => (
                <div
                  key={id}
                  className="border rounded-sm bg-emerald-50 p-3 shadow-sm"
                >
                  <div className="text-sm font-semibold text-neutral-900 mb-1">
                    {bankName}
                  </div>
                  <div className="text-sm text-neutral-700">
                    <div className="flex justify-between">
                      <span>Acc Holder:</span>
                      <span className="font-medium">{accountName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Bank Name:</span>
                      <span className="font-medium">{bankName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>IBAN:</span>
                      <span className="font-medium">{accountNumber}</span>
                    </div>
                    {bic && (
                      <div className="flex justify-between">
                        <span>BIC:</span>
                        <span className="font-medium">{bic}</span>
                      </div>
                    )}
                  </div>
                </div>
              )
            )}
          </div>
          <p className="text-neutral-400 text-sm mt-2">
            Note: After the payment, send the screenshot of the transaction.
          </p>
        </div>

        {/* Orders Table */}
        <div className="mb-4">
          <OrdersTable order={order} />
        </div>

        {/* Terms and Conditions and Financial Summary */}
        <div className="flex flex-col md:flex-row justify-between items-start border-t border-gray-200 pt-4">
          <div className="w-full md:w-1/2 pr-0 md:pr-4 mb-4 md:mb-0">
            <h2 className="text-lg font-bold text-gray-800 border-b pb-1 border-emerald-500">
              Terms and Conditions
            </h2>
            <ul className="mt-2 space-y-1 text-sm text-gray-600">
              <li>Free delivery only for orders over €10.</li>
              <li>For orders below €10, a €2.50 delivery fee applies.</li>
              <li>Indicate your invoice number for payment reference.</li>
            </ul>
          </div>

          <div className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between text-sm font-semibold text-gray-700">
              <span>Subtotal</span>
              <span className="text-gray-900">
                €{decimalToNumber(order.subtotal)}
              </span>
            </div>
            <div className="flex justify-between text-sm font-semibold text-gray-700">
              <span>Delivery Cost</span>
              <span className="text-gray-900">
                €{decimalToNumber(order.deliveryFee).toFixed(2)}
              </span>
            </div>
            {order.discounts && (
              <div className="mt-4">
                <span className="text-sm font-semibold text-red-600">
                  Discounts
                </span>
                {order.discounts.map((discount) => (
                  <div
                    key={discount.id}
                    className="flex justify-between text-sm font-semibold text-gray-700"
                  >
                    <span>{discount.code}</span>
                    <span className="text-red-500">
                      -€{decimalToNumber(discount.value).toFixed(2)}
                    </span>
                  </div>
                ))}
                <div className="flex justify-between text-sm font-semibold text-gray-700 border-t pt-2 border-gray-200">
                  <span>Total Discount</span>
                  <span className="text-red-500">
                    -€{decimalToNumber(order.totalDiscounts).toFixed(2)}
                  </span>
                </div>
              </div>
            )}
            <div className="flex justify-between text-lg font-bold text-emerald-600 border-t pt-4 border-gray-200">
              <span>Total</span>
              <span className="text-gray-900">
                €{decimalToNumber(order.total)}
              </span>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div className="mt-8 text-center text-sm text-gray-600 border-t pt-4">
          <div className="flex justify-center space-x-8 mb-4">
            <a
              href="https://wa.me/37126291271"
              className="text-center text-neutral-900 text-sm font-medium"
            >
              <Image
                src="/social/whatsapp.png"
                alt="WhatsApp"
                width={30}
                height={30}
                className="mx-auto mb-2"
              />
              <span>+371 2629 1271</span>
            </a>
            <a
              href="https://www.instagram.com/ceylongrocery.lv"
              className="text-center text-neutral-900 text-sm font-medium"
            >
              <Image
                src="/social/instagram.png"
                alt="Instagram"
                width={30}
                height={30}
                className="mx-auto mb-2"
              />
              <span>@ceylongrocery.lv</span>
            </a>
            <a
              href="https://www.facebook.com/ceylongrocerylatvia"
              className="text-center text-neutral-900 text-sm font-medium"
            >
              <Image
                src="/social/facebook.png"
                alt="Facebook"
                width={30}
                height={30}
                className="mx-auto mb-2"
              />
              <span>Ceylon Grocery Latvia</span>
            </a>
          </div>
          <p>Thank you for your order!</p>
        </div>
      </div>
    </>
  );
};

export default Invoice;
