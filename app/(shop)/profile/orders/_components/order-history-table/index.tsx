import { decimalToNumber } from "@/lib/utils";
import { columns, OrderHistoryItemRow } from "./columns";
import { OrderHistoryDataTable } from "./order-history-data-table";
import { ExtendedOrder } from "@/types/order";

interface OrdersHistoryTableProps {
  orders: ExtendedOrder[];
}

export const OrdersHistoryTable = ({ orders }: OrdersHistoryTableProps) => {
  const modifiedOrders: OrderHistoryItemRow[] = orders.map(
    ({
      id,
      invoice,
      subtotal,
      deliveryFee,
      totalDiscounts,
      total,
      orderDate,
      status,
    }) => ({
      id,
      invoice_number: invoice?.invoiceNumber ? invoice.invoiceNumber : -1,
      subtotal: decimalToNumber(subtotal),
      deliveryFee: decimalToNumber(deliveryFee),
      totalDiscounts: decimalToNumber(totalDiscounts),
      total: decimalToNumber(total),
      status,
      orderDate,
    })
  );

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Order History</h2>
      <OrderHistoryDataTable columns={columns} data={modifiedOrders} />
    </div>
  );
};
