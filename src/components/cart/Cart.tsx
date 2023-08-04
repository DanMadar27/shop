import React, { useEffect, useState } from 'react';

import CartList from './CartList';

import Product from '@/models/Product';

interface Props {
  products: Product[];
}

const CartContent: React.FC<Props> = ({ products }) => {
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (products.length) {
      const totalPrice = products.reduce((acc, product) => {
        return acc + (product.price * product.amount);
      }, 0);

      setTotalPrice(totalPrice);
    }
  }, [products]);

  return (
    <div>
      <CartList products={products} />
      <div>
        <p>Total Price: ${totalPrice}</p>
      </div>
      <button>Checkout</button>
    </div>
  );
};

export default CartContent;
