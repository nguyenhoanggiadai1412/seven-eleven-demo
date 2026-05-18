import api from "./api";
import type { Order, OrderStatus } from "../types/order.type";

export const orderService = {
  async getAll(): Promise<Order[]> {
    const response = await api.get<Order[]>("/admin/orders");
    return response.data;
  },

  async getById(id: number): Promise<Order> {
    const response = await api.get<Order>(`/admin/orders/${id}`);
    return response.data;
  },

  async updateStatus(id: number, status: OrderStatus): Promise<void> {
    await api.put(`/admin/orders/${id}/status`, { status });
  },
};
