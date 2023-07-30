import Modal from './Modal';

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
            <img
              src={product.image}
              alt={product.name}
              width={200}
              height={100}
            />
            
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p><b>Price</b>: {product.price}</p>

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