export const paymentMethods = [
  {
    method: "Cash on Delivery",
    description: "Pay with cash when your order is delivered to your doorstep.",
    active: true,
    bankAccounts: [],
  },
  {
    method: "Bank Transfer",
    description: "Transfer money directly to our bank account.",
    active: true,
    bankAccounts: [
      {
        bankName: "Revolut",
        accountName: "Dimantha Gunawardana",
        accountNumber: "LT913250099996537854",
        bic: "REVOLT21",
      },
      {
        bankName: "Wise",
        accountName: "Dimantha Vishwatharana Gunawardana",
        accountNumber: "BE32967151246002",
        bic: "TRWIBEB1XXX",
      },
    ],
  },
];
