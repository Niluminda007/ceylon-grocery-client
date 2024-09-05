"use client";

import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import useCheckOut from "@/hooks/use-checkout";
import { fetcher } from "@/lib/fetcher";
import { ExtendedPaymentMethod } from "@/types/payment";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaUniversity, FaUser, FaCreditCard, FaLock } from "react-icons/fa";

const PaymentPage = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    ExtendedPaymentMethod | undefined
  >(undefined);

  const {
    data: paymentMethods,
    isError,
    isLoading,
  } = useQuery<ExtendedPaymentMethod[]>({
    queryKey: ["payment-methods"],
    queryFn: () => fetcher({ url: "/fetch/payment-methods" }),
  });

  const router = useRouter();

  const setStage = useCheckOut((state) => state.setStage);
  const completeStage = useCheckOut((state) => state.completeStage);
  const setData = useCheckOut((state) => state.setData);
  const paymentMethod = useCheckOut((state) => state.data.paymentMethod);

  useEffect(() => {
    if (paymentMethods) {
      setData({
        paymentMethod: paymentMethods.find(
          (pM) => pM.method === "Bank Transfer"
        ),
      });
    }
  }, [paymentMethods]);

  useEffect(() => {
    setStage("payment");
    if (paymentMethod) {
      setSelectedPaymentMethod(paymentMethod);
    }
  }, [paymentMethod]);

  const handleSelectedPaymentMethod = (
    paymentMethod: ExtendedPaymentMethod
  ) => {
    setSelectedPaymentMethod(paymentMethod);
  };

  const handlePaymentSubmit = () => {
    if (selectedPaymentMethod) {
      setData({ paymentMethod: selectedPaymentMethod });
      completeStage("payment");
      router.push("/checkout/review");
    }
  };

  const activePaymentMethods = paymentMethods?.filter(
    (option) => option.active
  );

  return (
    <div className="w-full mx-auto flex flex-col space-y-6 bg-white rounded-lg p-6 shadow-md">
      <h1 className="text-3xl text-neutral-900 font-bold mb-6 text-center">
        Choose a Payment Method
      </h1>
      {isLoading && <Loader />}
      {isError && (
        <p className="text-red-500 text-center">
          Failed to load payment methods
        </p>
      )}
      <div className="flex flex-col space-y-4">
        {activePaymentMethods &&
          activePaymentMethods.map((pMethod, index) => (
            <div
              key={index}
              className={`${
                pMethod.id === selectedPaymentMethod?.id
                  ? "bg-blue-100 border-blue-300"
                  : "bg-gray-50"
              } flex flex-col p-5 rounded-lg border cursor-pointer transition transform hover:scale-105 duration-200`}
              role="button"
              onClick={() => handleSelectedPaymentMethod(pMethod)}
            >
              <div className="flex flex-col">
                <span className="text-xl text-neutral-800 font-semibold">
                  {pMethod.method}
                </span>
                <span className="text-sm text-neutral-600">
                  {pMethod.description}
                </span>
                {pMethod.method === "Bank Transfer" &&
                  selectedPaymentMethod?.method === "Bank Transfer" && (
                    <div className="mt-4 bg-white p-4 rounded-lg shadow-inner">
                      {pMethod.bankAccounts?.map((account, idx) => (
                        <div
                          key={idx}
                          className="text-sm text-neutral-700 p-2 border-b last:border-b-0"
                        >
                          <div className="flex items-center">
                            <FaUniversity className="mr-2 text-blue-600" />
                            <span>
                              <span className="font-semibold">Bank Name:</span>{" "}
                              {account.bankName}
                            </span>
                          </div>
                          <div className="flex items-center mt-2">
                            <FaUser className="mr-2 text-blue-600" />
                            <span>
                              <span className="font-semibold">
                                Account Name:
                              </span>{" "}
                              {account.accountName}
                            </span>
                          </div>
                          <div className="flex items-center mt-2">
                            <FaCreditCard className="mr-2 text-blue-600" />
                            <span>
                              <span className="font-semibold">
                                Account Number:
                              </span>{" "}
                              {account.accountNumber}
                            </span>
                          </div>
                          {account.bic && (
                            <div className="flex items-center mt-2">
                              <FaLock className="mr-2 text-blue-600" />
                              <span>
                                <span className="font-semibold">BIC:</span>{" "}
                                {account.bic}
                              </span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
              </div>
            </div>
          ))}
        <Button
          className="w-full p-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-indigo-300"
          onClick={handlePaymentSubmit}
          disabled={!selectedPaymentMethod}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default PaymentPage;
