import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../../../components/common/Modal";
import ProductTable from "../../../components/admin/ProductTable";
import { productService } from "../../../services/product.service";
import type { Product } from "../../../types/product.type";
import styles from "../AdminPage.module.css";

export default function ProductListPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  async function loadProducts() {
    try {
      setIsLoading(true);
      setError("");
      setProducts(await productService.getAll());
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Could not load products.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  async function handleDelete() {
    if (!productToDelete) {
      return;
    }

    await productService.delete(productToDelete.id);
    setProductToDelete(null);
    await loadProducts();
  }

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1>Products</h1>
          <p>Manage product inventory, pricing, and details.</p>
        </div>
        <div className={styles.actions}>
          <Link className={styles.primaryLink} to="/admin/products/create">
            Add Product
          </Link>
        </div>
      </header>

      {isLoading ? (
        <div className={styles.message}>Loading products...</div>
      ) : error ? (
        <div className={styles.message}>{error}</div>
      ) : (
        <ProductTable products={products} onDelete={setProductToDelete} />
      )}

      <Modal
        isOpen={Boolean(productToDelete)}
        title="Delete product"
        confirmLabel="Delete"
        onClose={() => setProductToDelete(null)}
        onConfirm={handleDelete}
      >
        Delete {productToDelete?.name}? This action cannot be undone.
      </Modal>
    </section>
  );
}
