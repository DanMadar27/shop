'use client';

import { useDispatch } from 'react-redux';
import { addProduct } from '@/app/GlobalRedux/features/cart/cartSlice';
import { setProduct } from '@/app/GlobalRedux/features/products/productSlice';

import Modal from './Modal';
import ProductContent from '../products/ProductContent';
import AddProductButton from '../inputs/Products/AddProductButton';
import RemoveProductButton from '../inputs/Products/RemoveProductButton';

import Product from '@/models/Product';

import styles from './Wishlist.module.css';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  products: Product[]
}

const Wishlist = (props: Props) => {
  const { isOpen, onClose, products } = props;

  const dispatch = useDispatch();

  const addAllToCart = () => {
    products.forEach((product) => {
      // @ts-ignore. This is a redux action
      dispatch(setProduct({...product, quantity: 1}));

      // @ts-ignore. This is a redux action
      dispatch(addProduct(product));
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2>Wishlist</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <ProductContent product={product} />
            <div className={styles.buttons}>
              <AddProductButton product={product} />
              <RemoveProductButton product={product} />
            </div>
         </li>
        ))}
      </ul>
      <button className={styles['add-all']} onClick={addAllToCart}>
        Add all to cart
      </button>
    </Modal>
  );
};

export default Wishlist;