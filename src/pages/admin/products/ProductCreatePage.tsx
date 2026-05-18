import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import ProductForm from "../../../components/admin/ProductForm";
import { productService } from "../../../services/product.service";
import type { ProductFormData } from "../../../types/product.type";
import styles from "../AdminPage.module.css";

export default function ProductCreatePage() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(data: ProductFormData) {
    setIsSubmitting(true);
    try {
      await productService.create(data);
      navigate("/admin/products");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1>Create Product</h1>
          <p>Add a new item to the store catalog.</p>
        </div>
        <div className={styles.actions}>
          <Link className={styles.secondaryLink} to="/admin/products">
            Back
          </Link>
        </div>
      </header>

      <ProductForm
        submitLabel="Create Product"
        isSubmitting={isSubmitting}
        onSubmit={handleSubmit}
      />
    </section>
  );
}
