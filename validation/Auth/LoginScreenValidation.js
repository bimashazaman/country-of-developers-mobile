import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required(' Email Required'),
  password: Yup.string()
    .required('No password provided.')
    .min(8, 'Password should be 8 chars minimum.'),
});
