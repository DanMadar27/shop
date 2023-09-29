import GoogleLogin from '@/components/inputs/GoogleLogin/GoogleLogin';
import styles from './login.module.css';

import {
  language,
  APP_TITLE,
  APP_TITLE_INTRODUCTION,
  PLEASE_LOGIN,
} from '@/config/texts';

export default function Login() {
  return (
    <div className={styles.container}>
      <div className='filled'>
        <h1>{APP_TITLE[language]}</h1>
      </div>
      <h2>{APP_TITLE_INTRODUCTION[language]}</h2>
      <h3>{PLEASE_LOGIN[language]}</h3>
      <GoogleLogin />
    </div>
  )
}
