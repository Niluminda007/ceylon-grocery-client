import { ExtendedOrder } from "@/types/order";
import { decimalToNumber } from "@/lib/utils";
import { DataTable } from "./data-table";
import { columns } from "./columns";

interface OrdersTableProps {
  order: ExtendedOrder;
}

export const OrdersTable = ({ order }: OrdersTableProps) => {
  const orderItems = order.orderItems.map((item) => ({
    name: item.product.name,
    weight: item.product.weight!,
    quantity: item.quantity,
    price: decimalToNumber(item.product.price),
    total: decimalToNumber(item.total),
  }));

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Order Details</h2>
      <DataTable columns={columns} data={orderItems} />
    </div>
  );
};
