import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import OrderDetail from "../../../components/admin/OrderDetail";
import { orderService } from "../../../services/order.service";
import type { Order } from "../../../types/order.type";
import styles from "../AdminPage.module.css";

export default function OrderDetailPage() {
  const { id } = useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadOrder() {
      try {
        setIsLoading(true);
        setError("");
        setOrder(await orderService.getById(Number(id)));
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : "Could not load order.");
      } finally {
        setIsLoading(false);
      }
    }

    loadOrder();
  }, [id]);

  if (isLoading) {
    return <div className={styles.message}>Loading order...</div>;
  }

  if (error || !order) {
    return <div className={styles.message}>{error || "Order not found."}</div>;
  }

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1>Order #{order.id}</h1>
          <p>{order.customerName}</p>
        </div>
        <div className={styles.actions}>
          <Link className={styles.secondaryLink} to="/admin/orders">
            Back
          </Link>
        </div>
      </header>

      <OrderDetail order={order} />
    </section>
  );
}
