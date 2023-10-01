import Product from '@/models/Product';
import styles from './ProductContent.module.css';

import {
  language,
  PRICE,
  QUANTITY,
} from '@/config/texts';

interface Props {
  product: Product
}

const ProductContent = (props: Props) => {
  const { product } = props;

  return (
    <div className={styles.container}>
      <img
        src={product.image}
        alt={product.name}
      />
    
      <h3 className='ellipsis'>{product.name}</h3>
      <p className='ellipsis'>{product.description}</p>
      <p><b>{PRICE[language]}</b>: ${product.price}</p>
      <p><b>{QUANTITY[language]}</b>: {product.quantity}</p>
    </div>
  );
};

export default ProductContent;
