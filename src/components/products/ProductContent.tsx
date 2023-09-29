import Product from '@/models/Product';
import styles from './ProductContent.module.css';

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
    
      <h3>{product.name}</h3>
      <p className='ellipsis'>{product.description}</p>
      <p><b>Price</b>: ${product.price}</p>
      <p><b>Quantity</b>: {product.quantity}</p>
    </div>
  );
};

export default ProductContent;
