// import NextPage generic type
import { NextPage } from 'next';

import ProductModel from '../../models/Product';
import ProductCard from './ProductCard';

import styles from './Products.module.css';

interface Props {
  products: ProductModel[];
}

const Products: NextPage<Props> = (props) => {
  const { products } = props;

  return (
    <ul className={styles.container}>
      {products.map((product) => (
        <ProductCard product={product} key={product.id}/>
      ))}
    </ul>
  );
};

export default Products;