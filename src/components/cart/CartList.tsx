import React from 'react';
import CartProduct from './CartProduct/CartProduct';
import Product from '@/models/Product';

interface CartListProps {
  products: Product[];
}

const CartList: React.FC<CartListProps> = ({ products }) => {
  return (
    <ul>
      {products.map((product) => (
        <CartProduct key={product.id} product={product} />
      ))}
    </ul>
  );
};

export default CartList;
