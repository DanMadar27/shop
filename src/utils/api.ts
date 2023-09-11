'use client';

import Product from '@/models/Product';
import Order, { OrderDetails } from '@/models/Order';

function headers() {
  return {
    'Content-Type': 'application/json',
  };
}

export async function getProducts(skip = 0, take = 10, search = ''): Promise<Product[]> {
  const url = `/api/products?skip=${skip}&take=${take}` + (search ? `&search=${search}` : '');
  const response = await fetch(url, { headers: headers() });
  
  if (!response.ok) {
    throw new Error(
      `Get Products: { status: ${response.status}, message: ${response.statusText} }`
    );
  }

  const products: Product[] = await response.json();
  return products;
}

export async function getProduct(productId: string): Promise<Product> {
  const url = `/api/products/${productId}`;
  const response = await fetch(url, { headers: headers() });

  if (!response.ok) {
    throw new Error(`Get Product: { status: ${response.status}, message: ${response.statusText} }`);
  }

  const product: Product = await response.json();
  return product;
}

export async function getOrders(skip = 0, take = 10): Promise<Order[]> {
  const url = `/api/orders?skip=${skip}&take=${take}`;
  const response = await fetch(url, { headers: headers() });
  
  if (!response.ok) {
    throw new Error(
      `Get Orders: { status: ${response.status}, message: ${response.statusText} }`
    );
  }

  const orders: Order[] = await response.json();
  return orders;
}

export async function getOrder(id: string): Promise<OrderDetails> {
  const url = `/api/orders/${id}`;
  const response = await fetch(url, { headers: headers() });

  if (!response.ok) {
    throw new Error(`Get Order: { status: ${response.status}, message: ${response.statusText} }`);
  }

  const order: OrderDetails = await response.json();
  return order;
}

export async function checkout(products: { id: number, quantity: number }[]) {
  const response = await fetch('/api/checkout', {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(products),
  });

  if (!response.ok) {
    throw new Error(`Checkout: { status: ${response.status}, message: ${response.statusText} }`);
  }

  return response.json();
}