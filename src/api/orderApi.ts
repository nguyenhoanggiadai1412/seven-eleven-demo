import api from "../services/api";
import type { OrderRequest, OrderResponse } from "../types/order";

export async function createOrder(order: OrderRequest): Promise<OrderResponse> {
  const response = await api.post<OrderResponse>("/orders", order);
  return response.data;
}
