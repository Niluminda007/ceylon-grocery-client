import { BankAccount, PaymentMethod } from "@prisma/client";

export type ExtendedPaymentMethod = PaymentMethod & {
  bankAccounts: BankAccount[];
};
