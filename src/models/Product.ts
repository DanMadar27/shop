export default interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
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
};
