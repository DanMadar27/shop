import { RootState } from '@/app/GlobalRedux/store';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, removeProduct, changeAmount} from '@/app/GlobalRedux/features/cart/cartSlice';

import Modal from './Modal';
import ProductContent from '../products/ProductContent';
import ChangeProductAmount from '../inputs/Products/ChangeProductAmount';

import Product from '@/models/Product';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const CartModal = (props: Props) => {
  const { isOpen, onClose } = props;

  const products: Product[] = useSelector((state: RootState) => state.cart.value);
  const dispatch = useDispatch();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2>Cart</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <ProductContent product={product} />
            <ChangeProductAmount product={product} />
         </li>
        ))}
      </ul>
    </Modal>
  );
};

export default CartModal;