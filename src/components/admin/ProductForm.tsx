import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import Button from "../common/Button";
import Input from "../common/Input";
import type { Product, ProductFormData } from "../../types/product.type";
import styles from "./ProductForm.module.css";

interface ProductFormProps {
  initialValue?: Product;
  isSubmitting?: boolean;
  submitLabel: string;
  onSubmit: (data: ProductFormData) => void | Promise<void>;
}

type ProductFormErrors = Partial<Record<keyof ProductFormData, string>>;

const emptyForm: ProductFormData = {
  name: "",
  description: "",
  price: 0,
  stock: 0,
  category: "",
  imageUrl: "",
};

export default function ProductForm({
  initialValue,
  isSubmitting = false,
  submitLabel,
  onSubmit,
}: ProductFormProps) {
  const [formData, setFormData] = useState<ProductFormData>(emptyForm);
  const [errors, setErrors] = useState<ProductFormErrors>({});

  useEffect(() => {
    if (initialValue) {
      setFormData({
        name: initialValue.name,
        description: initialValue.description,
        price: initialValue.price,
        stock: initialValue.stock,
        category: initialValue.category,
        imageUrl: initialValue.imageUrl,
      });
    }
  }, [initialValue]);

  function updateField(field: keyof ProductFormData, value: string) {
    setFormData((current) => ({
      ...current,
      [field]: field === "price" || field === "stock" ? Number(value) : value,
    }));
  }

  function validate() {
    const nextErrors: ProductFormErrors = {};

    if (!formData.name.trim()) {
      nextErrors.name = "Name is required.";
    }

    if (!formData.price || formData.price < 0) {
      nextErrors.price = "Price is required.";
    }

    if (formData.stock === undefined || formData.stock < 0) {
      nextErrors.stock = "Stock is required.";
    }

    if (!formData.category.trim()) {
      nextErrors.category = "Category is required.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    await onSubmit({
      ...formData,
      name: formData.name.trim(),
      category: formData.category.trim(),
      description: formData.description.trim(),
      imageUrl: formData.imageUrl.trim(),
    });
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.grid}>
        <Input
          label="Name"
          name="name"
          value={formData.name}
          onChange={(event) => updateField("name", event.target.value)}
          error={errors.name}
        />
        <Input
          label="Category"
          name="category"
          value={formData.category}
          onChange={(event) => updateField("category", event.target.value)}
          error={errors.category}
        />
        <Input
          label="Price"
          name="price"
          type="number"
          min="0"
          value={formData.price}
          onChange={(event) => updateField("price", event.target.value)}
          error={errors.price}
        />
        <Input
          label="Stock"
          name="stock"
          type="number"
          min="0"
          value={formData.stock}
          onChange={(event) => updateField("stock", event.target.value)}
          error={errors.stock}
        />
      </div>

      <label className={styles.field}>
        Description
        <textarea
          value={formData.description}
          onChange={(event) => updateField("description", event.target.value)}
          rows={5}
        />
      </label>

      <Input
        label="Image URL"
        name="imageUrl"
        value={formData.imageUrl}
        onChange={(event) => updateField("imageUrl", event.target.value)}
        placeholder="https://..."
      />

      <div className={styles.actions}>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}
