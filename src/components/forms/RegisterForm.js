'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const initialValues = {
  fullName: '',
  email: '',
  password: '',
  confirmPassword: ''
};

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required('Please enter your full name.'),
  email: Yup.string().email('Please enter a valid email address.').required('Email is required.'),
  password: Yup.string().min(6, 'Password must be at least 6 characters long.').required('Password is required.'),
  confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match.').required('Please confirm your password.'),
});

export default function RegisterForm() {
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      console.log(values);
      // Here, you can perform any asynchronous operations, such as making an API call.
      // For demonstration purposes, let's use a timeout to simulate an asynchronous operation.
      await new Promise((resolve) => setTimeout(resolve, 5000)); // Simulating a 1-second delay

      // After the asynchronous operation is complete, you can proceed with handling the form data.
      console.log('after timeout');
      setSubmitting(false);
    }
    catch (error) {
      console.error('Error occurred during form submission:', error);
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <label htmlFor='fullName'>Full Name:</label>
          <Field type='text' id='fullName' name='fullName' />

          <ErrorMessage name='fullName' component='div' className='error' />

          <label htmlFor='email'>Email Address:</label>
          <Field type='email' id='email' name='email' />

          <ErrorMessage name='email' component='div' className='error' />

          <label htmlFor='password'>Password:</label>
          <Field type='password' id='password' name='password' />

          <ErrorMessage name='password' component='div' className='error' />

          <label htmlFor='confirmPassword'>Confirm Password:</label>
          <Field type='password' id='confirmPassword' name='confirmPassword' />

          <ErrorMessage name='confirmPassword' component='div' className='error' />

          <input type='submit' value='Register' disabled={isSubmitting} />
        </Form>
      )}
    </Formik>
  );
}