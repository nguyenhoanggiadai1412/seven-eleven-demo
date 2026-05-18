import type { OrderRequest, OrderResponse } from "../types/order";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "https://seven-eleven-api-e318.onrender.com/api";

export async function createOrder(order: OrderRequest): Promise<OrderResponse> {
  const response = await fetch(`${API_BASE_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  });

  if (!response.ok) {
    throw new Error("Could not place the order. Please check the details and try again.");
  }

  return response.json() as Promise<OrderResponse>;
}
