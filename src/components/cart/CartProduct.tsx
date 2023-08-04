import React from 'react';

import Product from '@/models/Product';
import CounterButton from '../inputs/IconButtons/CounterButton';
import RemoveButton from '../inputs/IconButtons/RemoveButton';

interface Props {
  product: Product;
}

const CartProduct: React.FC<Props> = ({ product }) => {
  const removeProduct = async () => {
    // Remove product from cart
  }

  return (
    <div>
      <img
        src={product.image}
        alt={product.name}
      />
      <p>{product.name}</p>
      <p>{product.price}</p>

      <div className='flex-row-between'>
        <CounterButton initialValue={product.amount} />
        <RemoveButton onClick={removeProduct} />
      </div>
    </div>
  );
};

export default CartProduct;
