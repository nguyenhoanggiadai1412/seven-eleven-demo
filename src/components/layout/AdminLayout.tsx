import { NavLink, Outlet } from "react-router-dom";
import styles from "./AdminLayout.module.css";

export default function AdminLayout() {
  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          <strong>7-Eleven</strong>
          <span>Admin</span>
        </div>
        <nav className={styles.nav} aria-label="Admin navigation">
          <NavLink
            to="/admin/products"
            className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}
          >
            Products
          </NavLink>
          <NavLink
            to="/admin/orders"
            className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}
          >
            Orders
          </NavLink>
        </nav>
      </aside>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}
