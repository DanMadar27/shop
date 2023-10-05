import Product from '@/models/Product';
import styles from './ProductContent.module.css';

import {
  language,
  PRICE,
  QUANTITY,
} from '@/config/texts';

interface Props {
  product: Product,
  showQuantity?: boolean,
}

const ProductContent = (props: Props) => {
  const { product, showQuantity = true } = props;

  return (
    <div className={styles.container}>
      <img
        src={product.image}
        alt={product.name}
      />
    
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p><b>{PRICE[language]}</b>: ${product.price}</p>
      {showQuantity && (
        <p><b>{QUANTITY[language]}</b>: {product.quantity}</p>
      )}
    </div>
  );
};

export default ProductContent;
