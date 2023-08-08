import React from 'react';

import Product from '@/models/Product';
import CounterButton from '../../inputs/IconButtons/CounterButton';
import RemoveProductButton from '@/components/inputs/Products/RemoveProductButton';

import styles from './CartProduct.module.css';

interface Props {
  product: Product;
}

const CartProduct: React.FC<Props> = ({ product }) => {
  const removeProduct = async () => {
    // Remove product from cart
  }

  return (
    <li className={styles.container}>
      <img
        src={product.image}
        alt={product.name}
      />
      <div>
        <p>{product.name}</p>
        <p>${product.price}</p>
      </div>
      <div className='flex-row-between'>
        <CounterButton initialValue={product.amount} />
        <RemoveProductButton product={product} />
      </div>
    </li>
  );
};

export default CartProduct;
