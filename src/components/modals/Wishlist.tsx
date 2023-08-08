'use client';

import { useDispatch } from 'react-redux';

import Modal from './Modal';
import ProductContent from '../products/ProductContent';
import AddProductButton from '../inputs/Products/AddProductButton';

import Product from '@/models/Product';

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
            <AddProductButton product={product} />
         </li>
        ))}
      </ul>
    </Modal>
  );
};

export default Wishlist;