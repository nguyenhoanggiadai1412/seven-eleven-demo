import api from "./api";
import type { Order } from "../types/order.type";

export const orderService = {
  async getAll(): Promise<Order[]> {
    const response = await api.get<Order[]>("/orders");
    return response.data;
  },

  async getById(id: number): Promise<Order> {
    const response = await api.get<Order>(`/orders/${id}`);
    return response.data;
  },
};
