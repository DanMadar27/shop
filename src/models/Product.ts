export default interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  isFavorite: boolean;
  amount: number;
}

export const initialProduct: Product = {
  id: '',
  name: '',
  description: '',
  price: 0,
  image: '',
  isFavorite: false,
  amount: 0,
};
