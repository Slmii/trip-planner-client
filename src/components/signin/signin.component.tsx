import { Form, Formik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from 'react';

import Button from '@components/buttons/button';
import FormGroup from '@components/form/form-group';
import FormInputField from '@components/form/form-input-field';
import { SignInInitialValues, SubmitState } from '@components/signin';
import { MeDocument, MeQuery, useSignInMutation } from '@generated/graphql';

import { Content } from '@styles/index';

const Box = require('@material-ui/core/Box').default;
const Typography = require('@material-ui/core/Typography').default;
const Alert = require('@material-ui/lab/Alert').default;

const initialValues: SignInInitialValues = {
	email: '',
	password: ''
};

export default function SignIn() {
	const router = useRouter();
	const [submitState, setSubmitState] = useState<SubmitState>({ formError: '', isSubmitted: false });

	const [signIn] = useSignInMutation();

	return (
		<Content>
			<Formik
				initialValues={initialValues}
				onSubmit={async (values, _actions) => {
					setSubmitState(prevState => ({
						formError: prevState.formError,
						isSubmitted: true
					}));

					const response = await signIn({
						variables: {
							data: values
						},
						update: (cache, { data }) => {
							cache.writeQuery<MeQuery>({
								query: MeDocument,
								data: {
									__typename: 'Query',
									me: data?.signIn
								}
							});

							// TODO: propely delete cache after someone signs in
							cache.evict({ fieldName: 'trips' });
						}
					});

					if (response.errors?.length) {
						setSubmitState(() => ({
							formError: 'Invalid Sign In Credentials',
							isSubmitted: false
						}));
					}

					if (response.data?.signIn) {
						setSubmitState(prevState => ({
							...prevState,
							formError: ''
						}));

						if (typeof router.query.next === 'string') {
							router.push(router.query.next);
							return;
						}

						router.push('/');
					}
				}}
			>
				{props => (
					<Box width='100%'>
						<Form onSubmit={props.handleSubmit}>
							<Box textAlign='center' mb='20px'>
								<Typography variant='h6' component='h1' gutterBottom>
									Sign In to your account
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
								<FormInputField name='password' label='Password' type='password' />
							</FormGroup>
							<Box fontSize={14} display='flex' justifyContent='flex-end' mt={1.5} mb={1.5}>
								<Link href='/forgotten'>
									<a className='bold' title='Forgot password?'>
										Forgot password?
									</a>
								</Link>
							</Box>
							<Button type='submit' size='large' loading={submitState.isSubmitted}>
								Sign In
							</Button>
							<Box textAlign='center' mt={3}>
								Don&apos;t have an account yet?&nbsp;
								<Link href='/signup'>
									<a title='Sign Up' className='bold'>
										Sign Up
									</a>
								</Link>
							</Box>
						</Form>
					</Box>
				)}
			</Formik>
		</Content>
	);
}
