import React from 'react';
import CartProduct from './CartProduct';
import Product from '@/models/Product';

interface CartListProps {
  products: Product[];
}

const CartList: React.FC<CartListProps> = ({ products }) => {
  return (
    <div>
      {products.map((product) => (
        <CartProduct key={product.id} product={product} />
      ))}
    </div>
  );
};

export default CartList;
