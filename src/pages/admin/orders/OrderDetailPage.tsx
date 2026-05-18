import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import OrderDetail from "../../../components/admin/OrderDetail";
import { orderService } from "../../../services/order.service";
import type { Order, OrderStatus } from "../../../types/order.type";
import styles from "../AdminPage.module.css";

const orderStatuses: OrderStatus[] = ["PENDING", "CONFIRMED", "CANCELLED"];

export default function OrderDetailPage() {
  const { id } = useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSavingStatus, setIsSavingStatus] = useState(false);
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

  async function handleStatusChange(status: OrderStatus) {
    if (!order || status === order.status) {
      return;
    }

    try {
      setIsSavingStatus(true);
      setError("");
      await orderService.updateStatus(order.id, status);
      setOrder({ ...order, status });
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Could not update order status.");
    } finally {
      setIsSavingStatus(false);
    }
  }

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
          <select
            className={styles.select}
            disabled={isSavingStatus}
            value={order.status}
            onChange={(event) => handleStatusChange(event.target.value as OrderStatus)}
          >
            {orderStatuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          <Link className={styles.secondaryLink} to="/admin/orders">
            Back
          </Link>
        </div>
      </header>

      {error ? <div className={styles.message}>{error}</div> : null}
      <OrderDetail order={order} />
    </section>
  );
}
