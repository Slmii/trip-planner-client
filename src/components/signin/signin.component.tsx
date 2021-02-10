/* eslint-disable jsx-a11y/anchor-is-valid */
import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import Button from '@components/buttons/button';
import Alert from '@components/feedback/alert';
import FormGroup from '@components/inputs/form-group';
import FormInputField from '@components/inputs/form-input-field';
import { SignInInitialValues } from '@components/signin';
import { MeDocument, MeQuery, useSignInMutation } from '@generated/graphql';

import { Content } from '@styles/index';

const initialValues: SignInInitialValues = {
	email: '',
	password: ''
};

export default function SignIn() {
	const router = useRouter();
	const [submitState, setSubmitState] = useState({ formError: '', isSubmitted: false });

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
							<Box textAlign='center' mb={5}>
								<Heading as='h1' size='md'>
									Sign In to your account
								</Heading>
								{submitState.formError && (
									<Box mt={5}>
										<Alert status='error' error={submitState.formError} />
									</Box>
								)}
							</Box>
							<FormGroup>
								<FormInputField name='email' label='Email address' />
							</FormGroup>
							<FormGroup>
								<FormInputField name='password' label='Password' type='password' />
							</FormGroup>
							<Flex fontSize={14} justifyContent='flex-end' mt={5} mb={5}>
								<Text as={Link} href='/forgotten' passHref>
									<Text as='a' fontWeight='bold'>
										Forgot password?
									</Text>
								</Text>
							</Flex>
							<Button type='submit' size='lg' isFullWidth={true} isLoading={submitState.isSubmitted}>
								Sign In
							</Button>
							<Text textAlign='center' mt={12}>
								Don&apos;t have an account yet?&nbsp;
								<Text as={Link} href='/signup' passHref>
									<Text as='a' fontWeight='bold' color='secondary.500'>
										Sign up
									</Text>
								</Text>
							</Text>
						</Form>
					</Box>
				)}
			</Formik>
		</Content>
	);
}
