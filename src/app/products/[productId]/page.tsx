import styles from './product.module.css';

import Product from '@/models/Product';
import ProductContent from '@/components/products/ProductContent';

export default function ProductDetails({ params }: { params: { productId: string } }) {
  const { productId } = params;

  // In the future, fetch product from API 
  // Now use a mock product

  return (
    <div className={styles.container}>
      <h1>Product Details - {productId}</h1>
      {/* <ProductContent product={product} /> */}
    </div>
  )
}
