import type { FormEvent } from "react";
import type { OrderRequest } from "../types/order";

export type OrderFormValues = Omit<OrderRequest, "items">;

type OrderFormProps = {
  values: OrderFormValues;
  isSubmitting: boolean;
  isCartEmpty: boolean;
  onChange: (field: keyof OrderFormValues, value: string) => void;
  onSubmit: () => void;
};

export default function OrderForm({
  values,
  isSubmitting,
  isCartEmpty,
  onChange,
  onSubmit,
}: OrderFormProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit();
  }

  return (
    <form className="order-form" onSubmit={handleSubmit}>
      <label>
        Customer name
        <input
          type="text"
          value={values.customerName}
          onChange={(event) => onChange("customerName", event.target.value)}
          placeholder="Nguyen Van A"
        />
      </label>

      <label>
        Phone number
        <input
          type="tel"
          value={values.phone}
          onChange={(event) => onChange("phone", event.target.value)}
          placeholder="0909123456"
        />
      </label>

      <label>
        Delivery address
        <input
          type="text"
          value={values.address}
          onChange={(event) => onChange("address", event.target.value)}
          placeholder="Ho Chi Minh City"
        />
      </label>

      <label>
        Note
        <textarea
          value={values.note}
          onChange={(event) => onChange("note", event.target.value)}
          placeholder="Deliver in the morning"
          rows={3}
        />
      </label>

      <button type="submit" className="checkout-button" disabled={isSubmitting || isCartEmpty}>
        {isSubmitting ? "Placing Order..." : "Place Order"}
      </button>
    </form>
  );
}
