import type { Order } from "../../types/order.type";
import styles from "./OrderDetail.module.css";

interface OrderDetailProps {
  order: Order;
}

const currencyFormatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});

export default function OrderDetail({ order }: OrderDetailProps) {
  return (
    <div className={styles.detail}>
      <section className={styles.panel}>
        <h2>Customer Information</h2>
        <dl>
          <div>
            <dt>Name</dt>
            <dd>{order.customerName}</dd>
          </div>
          <div>
            <dt>Phone</dt>
            <dd>{order.customerPhone}</dd>
          </div>
          <div>
            <dt>Address</dt>
            <dd>{order.customerAddress}</dd>
          </div>
          <div>
            <dt>Status</dt>
            <dd>{order.status}</dd>
          </div>
        </dl>
      </section>

      <section className={styles.panel}>
        <h2>Ordered Products</h2>
        <div className={styles.items}>
          {order.items.map((item) => (
            <div className={styles.item} key={item.id}>
              <div>
                <strong>{item.productName}</strong>
                <span>Product #{item.productId}</span>
              </div>
              <span>{item.quantity} x {currencyFormatter.format(item.price)}</span>
              <strong>{currencyFormatter.format(item.quantity * item.price)}</strong>
            </div>
          ))}
        </div>
        <div className={styles.total}>
          <span>Total Amount</span>
          <strong>{currencyFormatter.format(order.totalAmount)}</strong>
        </div>
      </section>
    </div>
  );
}
