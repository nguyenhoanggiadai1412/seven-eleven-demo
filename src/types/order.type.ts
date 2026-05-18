export type OrderStatus = "PENDING" | "CONFIRMED" | "CANCELLED";

export interface OrderItem {
  id: number;
  productId: number;
  productName: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: number;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  totalAmount: number;
  status: OrderStatus;
  items: OrderItem[];
  createdAt: string;
}
