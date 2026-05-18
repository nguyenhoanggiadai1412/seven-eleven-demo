import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { productService } from "../../../services/product.service";
import type { Product } from "../../../types/product.type";
import styles from "../AdminPage.module.css";

const currencyFormatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProduct() {
      try {
        setIsLoading(true);
        setError("");
        setProduct(await productService.getById(Number(id)));
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : "Could not load product.");
      } finally {
        setIsLoading(false);
      }
    }

    loadProduct();
  }, [id]);

  if (isLoading) {
    return <div className={styles.message}>Loading product...</div>;
  }

  if (error || !product) {
    return <div className={styles.message}>{error || "Product not found."}</div>;
  }

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1>{product.name}</h1>
          <p>Product #{product.id}</p>
        </div>
        <div className={styles.actions}>
          <Link className={styles.secondaryLink} to="/admin/products">
            Back
          </Link>
          <Link className={styles.primaryLink} to={`/admin/products/${product.id}/edit`}>
            Edit
          </Link>
        </div>
      </header>

      <div className={`${styles.panel} ${styles.detailGrid}`}>
        <img className={styles.productImage} src={product.imageUrl} alt={product.name} />
        <div className={styles.productInfo}>
          <p>{product.description}</p>
          <dl>
            <div>
              <dt>Category</dt>
              <dd>{product.category}</dd>
            </div>
            <div>
              <dt>Price</dt>
              <dd>{currencyFormatter.format(product.price)}</dd>
            </div>
            <div>
              <dt>Stock</dt>
              <dd>{product.stock}</dd>
            </div>
            <div>
              <dt>Image URL</dt>
              <dd>{product.imageUrl}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
