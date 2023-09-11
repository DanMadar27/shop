import { ProductBase } from './Product';

export default interface Order {
  index: number;
  id: number;
  user_id: number;
  total_amount: number;
  status: string;
  created_at: string;
  link: string;
}

export interface OrderProduct {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  subtotal: number;
  created_at: string;
  product: ProductBase;
}

export interface OrderDetails {
  id: number;
  user_id: number;
  index: number;
  total_amount: number;
  status: string;
  created_at: string;
  order_products: OrderProduct[];
}