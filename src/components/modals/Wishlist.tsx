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

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2>Wishlist</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <ProductContent product={product} />
            
            <button>
              Add to cart
            </button>
         </li>
        ))}
      </ul>
    </Modal>
  );
};

export default Wishlist;