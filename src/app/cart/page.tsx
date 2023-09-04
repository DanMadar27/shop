import CartHeader from '@/components/cart/CartHeader/CartHeader';
import CartContent from '@/components/cart/Cart/Cart';

import styles from './cart.module.css';

export default function Cart() {
  return (
    <div className={styles.container}>
      <CartHeader backLink={'/products'}/>
      <h1>My Cart</h1>
      <CartContent />
    </div>
  )
}
