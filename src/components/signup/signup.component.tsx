/* eslint-disable jsx-a11y/anchor-is-valid */
import { Box, Input, Text, VStack } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { Form, Formik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Calendar from 'react-calendar';

import AccountTitle from '@components/account/account-title';
import Button from '@components/buttons/button';
import Alert from '@components/feedback/alert';
import FormInputField from '@components/inputs/form-input-field';
import Popover from '@components/overlay/popover';
import { SubmitState } from '@components/signin';
import {
    MeDocument,
    MeQuery,
    useEmailAddressByInvitationTokenQuery,
    useSignUpMutation
} from '@generated/graphql';
import { EU_DATE_FORMAT_SLASHES } from '@lib/constants';
import { date } from '@lib/utils';
import { signUpSchema } from '@lib/validations';

import { Content } from '@theme/shared.styled';
import spacing from '@theme/spacing';

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
					dateOfBirth: '',
					password: '',
					confirmPassword: ''
				}}
				enableReinitialize={true}
				validationSchema={signUpSchema}
				onSubmit={async values => {
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
				{({ values, setFieldValue, handleSubmit }) => (
					<Box width='100%'>
						<Form onSubmit={handleSubmit}>
							<Box textAlign='center' mb={5}>
								<AccountTitle heading='Sign up' />
								{submitState.formError && (
									<Box mt={5}>
										<Alert status='error' error={submitState.formError} />
									</Box>
								)}
							</Box>
							<VStack align='stretch' spacing={spacing.BODY_SPACING}>
								<FormInputField name='firstName' label='First name' />
								<FormInputField name='lastName' label='Last name' />
								<FormInputField name='email' label='Email address' />
								<Popover
									trigger={() => (
										<FormInputField name='dateOfBirth' label='Date of birth' isReadOnly={true} />
									)}
									body={({ onClose }) => (
										<Calendar
											value={values.dateOfBirth ? dayjs(values.dateOfBirth).toDate() : undefined}
											onChange={value => {
												onClose();
												setFieldValue(
													'dateOfBirth',
													date.formatDate({
														date: value as Date
													})
												);
											}}
										/>
									)}
									placement='bottom-start'
								/>
								<FormInputField name='password' label='Password' type='password' strengthMeter={true} />
								<FormInputField name='confirmPassword' label='Confirm password' type='password' />
							</VStack>
							<Box mt={5}>
								<Button type='submit' size='lg' isFullWidth={true} colorScheme='primary'>
									Sign Up
								</Button>
							</Box>
							<Text textAlign='center' mt={6}>
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
