import { ColumnDef } from "@tanstack/react-table";

export type OrderItemRow = {
  name: string;
  weight: string;
  quantity: number;
  price: number;
  total: number;
};

export const columns: ColumnDef<OrderItemRow>[] = [
  {
    header: "Item Name",
    accessorKey: "name",
    cell: (info) => info.getValue<string>(),
  },
  {
    header: "Weight",
    accessorKey: "weight",
    cell: (info) => info.getValue<string>(),
  },
  {
    header: "Quantity",
    accessorKey: "quantity",
    cell: (info) => info.getValue<number>(),
  },
  {
    header: "Price (€)",
    accessorKey: "price",
    cell: (info) => `€${info.getValue<number>().toFixed(2)}`,
  },
  {
    header: "Total (€)",
    accessorKey: "total",
    cell: (info) => `€${info.getValue<number>().toFixed(2)}`,
  },
];
