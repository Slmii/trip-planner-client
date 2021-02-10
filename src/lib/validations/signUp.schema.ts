import * as yup from 'yup';

// prettier-ignore
const signUpSchema = yup.object().shape({
    firstName: yup
        .string()
        .trim()
        .matches(/^[a-zA-Z ]*$/, 'First name can only contain alpha characters')
        .required('Please provide your first Name'),
    lastName: yup
        .string()
        .trim()
        .matches(/^[a-zA-Z ]*$/, 'Last name can only contain alpha characters')
        .required('Please provide your last name'),
    email: yup
        .string()
        .trim()
        .email('Please provide a valid email address')
        .required('Please provide your email address'),
    password: yup
        .string()
        .trim()
        .min(5, 'Password must be between 5-20 characters long')
        .required('Please provide your password'),
    confirmPassword: yup
        .string()
        .trim()
        .oneOf([yup.ref('password'), undefined], 'Passwords do not match')
        .required('Please confirm your password')
});

export default signUpSchema;
