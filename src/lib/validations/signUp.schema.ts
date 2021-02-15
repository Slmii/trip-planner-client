import dayjs from 'dayjs';
import * as yup from 'yup';

import { date } from '@lib/utils';

// prettier-ignore
const signUpSchema = yup.object().shape({
    firstName: yup
        .string()
        .trim()
        .matches(/^[a-zA-Z ]*$/, 'First name can only contain alpha characters.')
        .required('Please provide your first name.'),
    lastName: yup
        .string()
        .trim()
        .matches(/^[a-zA-Z ]*$/, 'Last name can only contain alpha characters.')
        .required('Please provide your last name.'),
    email: yup
        .string()
        .trim()
        .email('Please provide a valid email address.')
        .required('Please provide your email address.'),
    dateOfBirth: yup
        .date()
        .typeError('Please provide your date of birth.')
        .test('age', 'You must be at least 18 years old to signup.', birthdate => {
            const difference = date.getDifference({
                comparisonDate: birthdate ?? dayjs(),
                unit: 'year'
            });
            
            return difference >= 18;
        })
        .required('Please provide your date of birth.'),
    password: yup
        .string()
        .trim()
        .min(5, 'Password must be between 5-20 characters long.')
        .required('Please provide your password.'),
    confirmPassword: yup
        .string()
        .trim()
        .oneOf([yup.ref('password'), undefined], 'Passwords do not match.')
        .required('Please confirm your password.')
});

export default signUpSchema;
