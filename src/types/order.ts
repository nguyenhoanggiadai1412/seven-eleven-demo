export interface OrderItemRequest {
  productId: number;
  quantity: number;
}

export interface OrderRequest {
  customerName: string;
  phone: string;
  address: string;  
  note: string;
  items: OrderItemRequest[];
}

export interface OrderResponseItem {
  productId: number;
  productName: string;
  quantity: number;
  price: number;
}

export interface OrderResponse {
  id: number;
  customerName: string;
  phone: string;
  address: string;
  note: string;
  totalAmount: number;
  status: string;
  items: OrderResponseItem[];
}
