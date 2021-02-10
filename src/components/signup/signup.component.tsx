/* eslint-disable jsx-a11y/anchor-is-valid */
import { Box, Heading, Text } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import Button from '@components/buttons/button';
import Alert from '@components/feedback/alert';
import FormGroup from '@components/inputs/form-group';
import FormInputField from '@components/inputs/form-input-field';
import { SubmitState } from '@components/signin';
import {
    MeDocument,
    MeQuery,
    useEmailAddressByInvitationTokenQuery,
    useSignUpMutation
} from '@generated/graphql';
import { signUpSchema } from '@lib/validations';

import { Content } from '@styles/index';

export default function SignIn() {
	const router = useRouter();
	const { token } = router.query;

	const [submitState, setSubmitState] = useState<SubmitState>({ formError: '', isSubmitted: false });

	const [signUp] = useSignUpMutation();
	const { data } = useEmailAddressByInvitationTokenQuery({
		variables: {
			token: token as string
		},
		skip: !token
	});

	return (
		<Content>
			<Formik
				initialValues={{
					email: data?.getEmailAddressByInvitationToken ?? '',
					firstName: '',
					lastName: '',
					password: '',
					confirmPassword: ''
				}}
				enableReinitialize={true}
				validationSchema={signUpSchema}
				onSubmit={async (values, _actions) => {
					setSubmitState(prevState => ({
						formError: prevState.formError,
						isSubmitted: true
					}));

					const response = await signUp({
						variables: {
							data: {
								...values,
								invitationToken: token ? (token as string) : undefined
							}
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
							if (token) {
								router.push({
									pathname: '/account/received-invitations',
									query: {
										token
									}
								});
							} else {
								router.push('/');
							}
						}
					}
				}}
			>
				{props => (
					<Box width='100%'>
						<Form className='w-100' onSubmit={props.handleSubmit}>
							<Box textAlign='center' mb='20px'>
								<Heading as='h1' size='md'>
									Sign Up for an account
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
								<FormInputField name='firstName' label='First name' />
							</FormGroup>
							<FormGroup>
								<FormInputField name='lastName' label='Last name' />
							</FormGroup>
							<FormGroup>
								<FormInputField name='password' label='Password' type='password' strengthMeter={true} />
							</FormGroup>
							<FormGroup>
								<FormInputField name='confirmPassword' label='Confirm password' type='password' />
							</FormGroup>
							<Box mt={5}>
								<Button type='submit' size='lg' isFullWidth={true} colorScheme='primary'>
									Sign Up
								</Button>
							</Box>
							<Text textAlign='center' mt={12}>
								Already have an account?&nbsp;
								<Text as={Link} href='/signin' passHref>
									<Text as='a' fontWeight='bold' color='secondary.500'>
										Sign in
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
