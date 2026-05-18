import { Link } from "react-router-dom";
import Table from "../common/Table";
import type { Order } from "../../types/order.type";
import styles from "./AdminTables.module.css";

interface OrderTableProps {
  orders: Order[];
}

const currencyFormatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});

const dateFormatter = new Intl.DateTimeFormat("vi-VN", {
  dateStyle: "medium",
  timeStyle: "short",
});

export default function OrderTable({ orders }: OrderTableProps) {
  return (
    <Table
      data={orders}
      getRowKey={(order) => order.id}
      emptyText="No orders available."
      columns={[
        { key: "id", header: "ID", render: (order) => `#${order.id}` },
        { key: "customerName", header: "Customer", render: (order) => order.customerName },
        {
          key: "totalAmount",
          header: "Total",
          render: (order) => currencyFormatter.format(order.totalAmount),
        },
        {
          key: "status",
          header: "Status",
          render: (order) => (
            <span className={`${styles.status} ${styles[order.status.toLowerCase()]}`}>
              {order.status}
            </span>
          ),
        },
        {
          key: "createdAt",
          header: "Created At",
          render: (order) => dateFormatter.format(new Date(order.createdAt)),
        },
        {
          key: "actions",
          header: "Actions",
          render: (order) => (
            <Link className={styles.linkButton} to={`/admin/orders/${order.id}`}>
              View Detail
            </Link>
          ),
        },
      ]}
    />
  );
}
