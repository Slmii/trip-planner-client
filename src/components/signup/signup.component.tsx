/* eslint-disable jsx-a11y/anchor-is-valid */
import { Form, Formik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

import Button from '@components/buttons/button';
import FormGroup from '@components/form/form-group';
import FormInputField from '@components/form/form-input-field';
import { SubmitState } from '@components/signin';
import {
    MeDocument,
    MeQuery,
    useEmailAddressByInvitationTokenQuery,
    useSignUpMutation
} from '@generated/graphql';
import { signUpSchema } from '@lib/validations';

import { Content } from '@styles/global-styled';

const Box = require('@material-ui/core/Box').default;
const Typography = require('@material-ui/core/Typography').default;
const Alert = require('@material-ui/lab/Alert').default;

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
						<Button type='submit' size='large' color='primary' loading={submitState.isSubmitted}>
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
