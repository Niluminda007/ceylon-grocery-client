import Logo from "@/components/logo";
import { FC, useRef, useState } from "react";
import Image from "next/image";
import { FaDownload, FaMoneyBillWave, FaSpinner } from "react-icons/fa";
import { ExtendedOrder } from "@/types/order";
import {
  calculateDeliveryDate,
  decimalToNumber,
  formatAddress,
} from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { OrdersTable } from "./orders-table";
import { generateInvoice } from "@/lib/generate-invoice";

interface InvoiceProps {
  order: ExtendedOrder;
}

const Invoice: FC<InvoiceProps> = ({ order }: InvoiceProps) => {
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
  const contactNumber = order && order.contactNumber ? order.contactNumber : "";

  let deliveryDate = "";
  let deliveryText = "";

  if (
    order.deliveryOption &&
    order.deliveryOption.method !== "Pick up myself"
  ) {
    deliveryDate = calculateDeliveryDate(order.orderDate, order.deliveryOption);
    deliveryText =
      order.deliveryOption.method === "Express"
        ? "(Within 24 hours)"
        : order.deliveryOption.method === "International Delivery"
        ? "(Within 3-5 days)"
        : "(Monday & Thursday 8pm to 10pm)";
  }

  console.log(deliveryDate);

  const pickUpLocation = "Graudu iela 30, Riga";
  const pickUpDate = "(Wednesday or Saturday, 10:00 AM to 10:00 PM)";

  const isBankTransfer = order.paymentMethod?.method === "Bank Transfer";

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
              {contactNumber !== "" && (
                <div className="mt-2">
                  <span className="font-semibold">
                    Customer Contact Number:{" "}
                  </span>
                  {order.contactNumber}
                </div>
              )}
              {order.deliveryOption &&
              order.deliveryOption.method !== "Pick up myself" ? (
                <>
                  <div className="mt-2">
                    <span className="font-semibold">
                      Expected Delivery Date:{" "}
                    </span>
                    {deliveryDate}
                  </div>
                  <div>{deliveryText}</div>
                </>
              ) : (
                <>
                  <div className="mt-2">
                    <span className="font-semibold">Pick-Up Location: </span>
                    {pickUpLocation}
                  </div>
                  <div>{pickUpDate}</div>
                </>
              )}

              <div>
                <span className="font-semibold">Invoice Date: </span>
                {new Date(order.invoice!.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        {!isBankTransfer ? (
          <div className="mb-6 flex items-start space-x-4 border rounded-lg bg-yellow-50 p-4 shadow-sm">
            <div className="text-yellow-600 text-2xl">
              <FaMoneyBillWave />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-800 underline decoration-yellow-500 mb-2">
                Payment Method: Cash on Delivery
              </h2>
              <p className="text-sm text-gray-700 leading-relaxed">
                Please have the total amount ready in cash upon delivery.
                Payment will be collected at your doorstep.
              </p>
            </div>
          </div>
        ) : (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">
              Bank Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {order.paymentMethod?.bankAccounts?.map(
                ({ id, bankName, accountName, accountNumber, bic }) => (
                  <div
                    key={id}
                    className="border rounded-lg bg-emerald-50 p-4 shadow-sm"
                  >
                    <div className="text-sm font-semibold text-neutral-900 mb-2">
                      {bankName}
                    </div>
                    <div className="text-sm text-gray-700">
                      <div className="flex justify-between">
                        <span>Acc Holder:</span>
                        <span className="font-medium">{accountName}</span>
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
            <p className="text-sm text-neutral-400 mt-2">
              Note: After the payment, please send a screenshot of the
              transaction.
            </p>
          </div>
        )}

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
