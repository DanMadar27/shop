'use client';

import { useDispatch } from 'react-redux';
import { setProduct } from '@/app/GlobalRedux/features/products/productSlice';
import { addProduct, removeProduct, changeAmount} from '@/app/GlobalRedux/features/cart/cartSlice';

import Modal from './Modal';
import ProductContent from '../products/ProductContent';

import Product from '@/models/Product';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  products: Product[]
}

const Wishlist = (props: Props) => {
  const { isOpen, onClose, products } = props;

  const dispatch = useDispatch();

  const addToCart = (product: Product) => {
    // @ts-ignore. This is a redux action
    dispatch(setProduct({...product, amount: 1}));
    // @ts-ignore. This is a redux action
    dispatch(addProduct(product));
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2>Wishlist</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <ProductContent product={product} />
            
            <button onClick={() => addToCart(product)}>
              Add to cart
            </button>
         </li>
        ))}
      </ul>
    </Modal>
  );
};

export default Wishlist;