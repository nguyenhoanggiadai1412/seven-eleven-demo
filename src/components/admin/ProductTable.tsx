import { Link } from "react-router-dom";
import Button from "../common/Button";
import Table from "../common/Table";
import type { Product } from "../../types/product.type";
import styles from "./AdminTables.module.css";

interface ProductTableProps {
  products: Product[];
  onDelete: (product: Product) => void;
}

const currencyFormatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});

export default function ProductTable({ products, onDelete }: ProductTableProps) {
  return (
    <Table
      data={products}
      getRowKey={(product) => product.id}
      emptyText="No products available."
      columns={[
        {
          key: "image",
          header: "Image",
          render: (product) => (
            <img className={styles.thumbnail} src={product.imageUrl} alt={product.name} />
          ),
        },
        { key: "name", header: "Name", render: (product) => product.name },
        { key: "category", header: "Category", render: (product) => product.category },
        {
          key: "price",
          header: "Price",
          render: (product) => currencyFormatter.format(product.price),
        },
        { key: "stock", header: "Stock", render: (product) => product.stock },
        {
          key: "actions",
          header: "Actions",
          render: (product) => (
            <div className={styles.actions}>
              <Link className={styles.linkButton} to={`/admin/products/${product.id}`}>
                View
              </Link>
              <Link className={styles.linkButton} to={`/admin/products/${product.id}/edit`}>
                Edit
              </Link>
              <Button type="button" variant="danger" onClick={() => onDelete(product)}>
                Delete
              </Button>
            </div>
          ),
        },
      ]}
    />
  );
}
