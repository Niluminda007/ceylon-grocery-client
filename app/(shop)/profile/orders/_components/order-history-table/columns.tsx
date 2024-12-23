import React from "react";
import { ArrowUpDown } from "lucide-react";
import { ORDER_STATUS } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { FaFileInvoice, FaEye } from "react-icons/fa";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export type OrderHistoryItemRow = {
  id: string;
  invoice_number: number;
  subtotal: number;
  deliveryFee: number;
  totalDiscounts: number;
  total: number;
  status: ORDER_STATUS;
  orderDate: Date;
};

export const columns: ColumnDef<OrderHistoryItemRow>[] = [
  {
    header: "Order Id",
    accessorKey: "id",
    enableHiding: true,
    cell: ({ row }) => {
      const value = row.getValue("id") as string;
      return <span className="font-semibold text-blue-700">{value}</span>;
    },
  },

  {
    header: "Invoice Number",
    accessorKey: "invoice_number",
    cell: ({ row }) => {
      const value = row.getValue("invoice_number") as string;
      return <span className="font-semibold text-blue-700">{value}</span>;
    },
  },
  {
    header: ({ column }) => {
      return (
        <Button
          className="pl-0"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Subtotal
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    accessorKey: "subtotal",
    cell: ({ row }) => {
      const value = row.getValue("subtotal") as number;
      return (
        <span className="text-green-700 font-semibold">{`€${value.toFixed(
          2
        )}`}</span>
      );
    },
  },
  {
    header: "Delivery Fee",
    accessorKey: "deliveryFee",
    cell: ({ row }) => {
      const value = row.getValue("deliveryFee") as number;
      return <span className="text-red-600">{`€${value.toFixed(2)}`}</span>;
    },
  },
  {
    header: "Total Discounts",
    accessorKey: "totalDiscounts",
    cell: ({ row }) => {
      const value = row.getValue("totalDiscounts") as number;
      return <span className="text-gray-800">{`-€${value.toFixed(2)}`}</span>;
    },
  },
  {
    header: ({ column }) => {
      return (
        <Button
          className="pl-0"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Total
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    accessorKey: "total",
    cell: ({ row }) => {
      const value = row.getValue("total") as number;
      return (
        <span className="font-bold text-gray-900">{`€${value.toFixed(
          2
        )}`}</span>
      );
    },
  },
  {
    header: "Order Status",
    accessorKey: "status",
    cell: ({ row }) => {
      const value = row.getValue("status") as ORDER_STATUS;
      const statusStyles = {
        PENDING: "text-yellow-700 bg-yellow-200 px-2 py-1 rounded-full",
        COMPLETED: "text-green-700 bg-green-200 px-2 py-1 rounded-full",
        CANCELLED: "text-red-700 bg-red-200 px-2 py-1 rounded-full",
        SHIPPED: "text-blue-700 bg-blue-200 px-2 py-1 rounded-full",
        DELIVERED: "text-teal-700 bg-teal-200 px-2 py-1 rounded-full",
        RETURNED: "text-orange-700 bg-orange-200 px-2 py-1 rounded-full",
        REFUNDED: "text-purple-700 bg-purple-200 px-2 py-1 rounded-full",
      };
      return <span className={statusStyles[value] as string}>{value}</span>;
    },
  },
  {
    header: ({ column }) => {
      return (
        <Button
          className="pl-0"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Order Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    accessorKey: "orderDate",
    cell: ({ row }) => {
      const value = row.getValue("orderDate") as Date;
      return (
        <span className="text-gray-600">
          {new Date(value).toLocaleDateString()}
        </span>
      );
    },
  },
  {
    header: "View Order",
    cell: ({ row }) => {
      const id = row.getValue("id") as string;
      return (
        <Link
          href={`/profile/orders/${id}`}
          className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded inline-flex items-center"
        >
          <FaEye className="mr-2" /> View Details
        </Link>
      );
    },
  },
  {
    header: "View Invoice",
    cell: ({ row }) => {
      const id = row.getValue("id") as string;
      return (
        <Link
          href={`/profile/orders/${id}/invoice`}
          className="bg-gray-600 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded inline-flex items-center"
        >
          <FaFileInvoice className="mr-2" /> View Invoice
        </Link>
      );
    },
  },
];
