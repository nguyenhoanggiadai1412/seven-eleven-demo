import type { Product } from "../types/product";

type ProductCardProps = {
  product: Product;
  cartQuantity: number;
  onAddToCart: (product: Product) => void;
};

const currencyFormatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});

export default function ProductCard({ product, cartQuantity, onAddToCart }: ProductCardProps) {
  const isOutOfStock = product.stock <= 0;
  const isMaxInCart = cartQuantity >= product.stock;

  return (
    <article className="product-card">
      <div className="product-card__image-wrap">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="product-card__image"
          loading="lazy"
        />
      </div>

      <div className="product-card__body">
        <div>
          <p className="product-card__category">{product.category}</p>
          <h3 className="product-card__name">{product.name}</h3>
          <p className="product-card__description">{product.description}</p>
        </div>

        <div className="product-card__meta">
          <span className="product-card__price">{currencyFormatter.format(product.price)}</span>
          <span className={isOutOfStock ? "stock stock--empty" : "stock"}>
            {isOutOfStock ? "Out of stock" : `${product.stock} available`}
          </span>
        </div>

        <button
          type="button"
          className="primary-button"
          disabled={isOutOfStock || isMaxInCart}
          onClick={() => onAddToCart(product)}
        >
          {isMaxInCart && !isOutOfStock ? "Max in cart" : "Add to Cart"}
        </button>
      </div>
    </article>
  );
}
