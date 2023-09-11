export interface ProductBase {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  created_at: string;
  updated_at: string;
}

export default interface Product extends ProductBase {
  isFavorite: boolean;
  quantity: number;
}

export const initialProduct: Product = {
  id: -1,
  name: '',
  description: '',
  price: 0,
  image: '',
  isFavorite: false,
  quantity: 0,
  created_at: '',
  updated_at: '',
};
