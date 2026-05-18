import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductForm from "../../../components/admin/ProductForm";
import { productService } from "../../../services/product.service";
import type { Product, ProductFormData } from "../../../types/product.type";
import styles from "../AdminPage.module.css";

export default function ProductEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  async function handleSubmit(data: ProductFormData) {
    setIsSubmitting(true);
    try {
      await productService.update(Number(id), data);
      navigate(`/admin/products/${id}`);
    } finally {
      setIsSubmitting(false);
    }
  }

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
          <h1>Edit Product</h1>
          <p>Update {product.name}.</p>
        </div>
        <div className={styles.actions}>
          <Link className={styles.secondaryLink} to={`/admin/products/${product.id}`}>
            Back
          </Link>
        </div>
      </header>

      <ProductForm
        initialValue={product}
        submitLabel="Save Changes"
        isSubmitting={isSubmitting}
        onSubmit={handleSubmit}
      />
    </section>
  );
}
