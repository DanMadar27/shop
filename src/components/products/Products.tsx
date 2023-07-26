// import NextPage generic type
import { NextPage } from "next";

import ProductModel from "../../models/Product";
import Product from "./ProductCard";

import styles from './Products.module.css';

interface Props {
  products: ProductModel[];
}

const Products: NextPage<Props> = (props) => {
  const { products } = props;

  return (
    <ul className={styles.container}>
      {products.map((product) => (
        <Product product={product} />
      ))}
    </ul>
  );
};

export default Products;