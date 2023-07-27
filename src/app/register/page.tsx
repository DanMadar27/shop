import Link from 'next/link';

import RegisterForm from '../../components/forms/RegisterForm';

import styles from './register.module.css';

export default function Register() {
  return (
    <div className={styles.container}>
      <div className='filled'>
        <h1>Shop</h1>
      </div>
      <h2>Welcome to Shop!!</h2>
      <h3>Register to Continue</h3>
      <RegisterForm />
      <p>
        Already have an account? <Link href='/login'>Login</Link>
      </p>
    </div>
  )
}
