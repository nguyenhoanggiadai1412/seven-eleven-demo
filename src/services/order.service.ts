import api from "./api";
import type { Order } from "../types/order.type";

const mockOrders: Order[] = [
  {
    id: 101,
    customerName: "Nguyen Minh Anh",
    customerPhone: "0901234567",
    customerAddress: "12 Nguyen Trai, District 1, Ho Chi Minh City",
    totalAmount: 91000,
    status: "PENDING",
    createdAt: "2026-05-17T09:30:00.000Z",
    items: [
      { id: 1, productId: 1, productName: "Classic Sandwich", quantity: 1, price: 32000 },
      { id: 2, productId: 3, productName: "Chicken Bento", quantity: 1, price: 59000 },
    ],
  },
  {
    id: 102,
    customerName: "Tran Hoang",
    customerPhone: "0912345678",
    customerAddress: "48 Le Loi, District 3, Ho Chi Minh City",
    totalAmount: 56000,
    status: "CONFIRMED",
    createdAt: "2026-05-16T14:10:00.000Z",
    items: [
      { id: 3, productId: 2, productName: "Iced Latte", quantity: 2, price: 28000 },
    ],
  },
  {
    id: 103,
    customerName: "Le Thanh",
    customerPhone: "0987654321",
    customerAddress: "7 Pasteur, District 1, Ho Chi Minh City",
    totalAmount: 32000,
    status: "CANCELLED",
    createdAt: "2026-05-15T11:45:00.000Z",
    items: [
      { id: 4, productId: 1, productName: "Classic Sandwich", quantity: 1, price: 32000 },
    ],
  },
];

export const orderService = {
  async getAll(): Promise<Order[]> {
    try {
      const response = await api.get<Order[]>("/orders");
      return response.data;
    } catch {
      return mockOrders;
    }
  },

  async getById(id: number): Promise<Order> {
    try {
      const response = await api.get<Order>(`/orders/${id}`);
      return response.data;
    } catch {
      const order = mockOrders.find((item) => item.id === id);

      if (!order) {
        throw new Error("Order not found.");
      }

      return order;
    }
  },
};
