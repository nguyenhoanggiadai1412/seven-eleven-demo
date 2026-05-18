import type { CartItem as CartItemType } from "../types/product";

type CartItemProps = {
  item: CartItemType;
  onIncrease: (productId: number) => void;
  onDecrease: (productId: number) => void;
  onRemove: (productId: number) => void;
};

const currencyFormatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});

export default function CartItem({ item, onIncrease, onDecrease, onRemove }: CartItemProps) {
  const { product, quantity } = item;

  return (
    <div className="cart-item">
      <img src={product.imageUrl} alt={product.name} className="cart-item__image" />

      <div className="cart-item__details">
        <h4>{product.name}</h4>
        <p>{currencyFormatter.format(product.price)}</p>
      </div>

      <div className="cart-item__controls">
        <button
          type="button"
          className="quantity-button"
          onClick={() => onDecrease(product.id)}
          aria-label={`Decrease ${product.name} quantity`}
        >
          -
        </button>
        <span>{quantity}</span>
        <button
          type="button"
          className="quantity-button"
          disabled={quantity >= product.stock}
          onClick={() => onIncrease(product.id)}
          aria-label={`Increase ${product.name} quantity`}
        >
          +
        </button>
      </div>

      <button type="button" className="remove-button" onClick={() => onRemove(product.id)}>
        Remove
      </button>
    </div>
  );
}
