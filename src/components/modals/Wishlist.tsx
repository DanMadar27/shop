'use client';

import { useDispatch } from 'react-redux';

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
    </Modal>
  );
};

export default Wishlist;