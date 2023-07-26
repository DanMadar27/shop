import RegisterForm from './RegisterForm';

import classes from './register.module.css';

export default function Home() {
  return (
    <div className={classes.container}>
      <div className='filled'>
        <h1>Shop</h1>
      </div>
      <h2>Welcome to Shop!!</h2>
      <h3>Register to Continue</h3>
      <RegisterForm />
    </div>
  )
}
