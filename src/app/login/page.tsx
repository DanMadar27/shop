import Link from 'next/link';

import LoginForm from '../../components/forms/LoginForm';

import styles from './login.module.css';

export default function Login() {
  return (
    <div className={styles.container}>
      <div className='filled'>
        <h1>Shop</h1>
      </div>
      <h2>Welcome to Shop!!</h2>
      <h3>Login to Continue</h3>
      <LoginForm />
      <p>
        Don't have account? <Link href='/register'>Register</Link>
      </p>
    </div>
  )
}
