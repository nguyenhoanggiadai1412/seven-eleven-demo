import { useEffect, useState } from "react";
import OrderTable from "../../../components/admin/OrderTable";
import { orderService } from "../../../services/order.service";
import type { Order } from "../../../types/order.type";
import styles from "../AdminPage.module.css";

export default function OrderListPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadOrders() {
      try {
        setIsLoading(true);
        setError("");
        setOrders(await orderService.getAll());
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : "Could not load orders.");
      } finally {
        setIsLoading(false);
      }
    }

    loadOrders();
  }, []);

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1>Orders</h1>
          <p>Review customer orders and fulfillment status.</p>
        </div>
      </header>

      {isLoading ? (
        <div className={styles.message}>Loading orders...</div>
      ) : error ? (
        <div className={styles.message}>{error}</div>
      ) : (
        <OrderTable orders={orders} />
      )}
    </section>
  );
}
