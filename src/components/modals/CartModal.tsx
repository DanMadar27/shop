import Modal from './Modal';
import ProductContent from '../products/ProductContent';
import CounterButton from '../inputs/IconButtons/CounterButton';

import Product from '@/models/Product';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  products: Product[]
}

const CartModal = (props: Props) => {
  const { isOpen, onClose, products } = props;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2>Cart</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <ProductContent product={product} />
            <CounterButton initialValue={product.amount} />
         </li>
        ))}
      </ul>
    </Modal>
  );
};

export default CartModal;