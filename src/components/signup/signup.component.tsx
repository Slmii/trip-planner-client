/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Formik, Form, FormikProps } from 'formik';
const Box = require('@material-ui/core/Box').default;
const Typography = require('@material-ui/core/Typography').default;
const Alert = require('@material-ui/lab/Alert').default;

import { FormGroup, FormInputField } from '@components/form';
import { Button } from '@components/button';
import { signUpSchema } from '@lib/validations';
import { SignUpInitialValues } from '@lib/types';
import { MeDocument, MeQuery, useSignUpMutation } from '@generated/graphql';

import { Content } from '../../styles/global-styled';

const initialValues: SignUpInitialValues = {
	email: '',
	firstName: '',
	lastName: '',
	password: '',
	confirmPassword: ''
};

export default function SignIn() {
	const router = useRouter();
	const [submitState, setSubmitState] = useState<{ formError: string; isSubmitted: boolean }>({ formError: '', isSubmitted: false });

	const [signUp] = useSignUpMutation();

	return (
		<Content>
			<Formik
				initialValues={initialValues}
				validationSchema={signUpSchema}
				onSubmit={async (values, _actions) => {
					setSubmitState(prevState => ({
						formError: prevState.formError,
						isSubmitted: true
					}));

					const response = await signUp({
						variables: {
							data: values
						},
						update: (cache, { data }) => {
							cache.writeQuery<MeQuery>({
								query: MeDocument,
								data: {
									__typename: 'Query',
									me: data?.signUp
								}
							});
						}
					});

					if (response.errors?.length) {
						setSubmitState(() => ({
							formError: response.errors?.map(err => err.message)[0] as string,
							isSubmitted: false
						}));
					} else if (response.data?.signUp) {
						if (typeof router.query.next === 'string') {
							router.push(router.query.next);
						} else {
							router.push('/');
						}
					}
				}}
			>
				{(props: FormikProps<SignUpInitialValues>) => (
					<Form className='w-100' onSubmit={props.handleSubmit}>
						<Box textAlign='center' mb='20px'>
							<Typography variant='h6' component='h1' gutterBottom>
								Sign Up for an account
							</Typography>
							{submitState.formError && (
								<Box color='error.main'>
									<Alert severity='error'>{submitState.formError}</Alert>
								</Box>
							)}
						</Box>
						<FormGroup>
							<FormInputField name='email' label='Email Address' />
						</FormGroup>
						<FormGroup>
							<FormInputField name='firstName' label='First Name' />
						</FormGroup>
						<FormGroup>
							<FormInputField name='lastName' label='Last Name' />
						</FormGroup>
						<FormGroup>
							<FormInputField name='password' label='Password' type='password' strengthMeter={true} />
						</FormGroup>
						<FormGroup>
							<FormInputField name='confirmPassword' label='Confirm Password' type='password' />
						</FormGroup>
						<Button type='submit' size='large' loading={submitState.isSubmitted}>
							Sign Up
						</Button>
						<Box textAlign='center' mt={3}>
							Already have an account?&nbsp;
							<Link href='/signin'>
								<a title='Sign In' className='bold'>
									Sign In
								</a>
							</Link>
						</Box>
					</Form>
				)}
			</Formik>
		</Content>
	);
}

SignIn;
