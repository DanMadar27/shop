import RegisterForm from './RegisterForm';

import classes from './register.module.css';

export default function Home() {
  return (
    <div className={classes.container}>
      <h1>Register</h1>
      <RegisterForm />
    </div>
  )
}
