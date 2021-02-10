import isEmail from 'validator/lib/isEmail';
import isIn from 'validator/lib/isIn';
import trim from 'validator/lib/trim';

import { NotificationType, SubPreparationFragment } from '@generated/graphql';
import { KeyOf, ValueOf } from '@lib/types';

export const hasNotProperties = <T>(object: Record<KeyOf<T>, ValueOf<T>>, properties: Array<KeyOf<T>>) => {
	return Object.keys(object).every(key => !properties.includes(key as KeyOf<T>));
};

export const calculatePreperationsCompletionPercentage = (subPreparations: SubPreparationFragment[]) => {
	const completedSubPreparations = subPreparations.filter(({ status }) => status).length;
	const percentageCompletion = (completedSubPreparations / subPreparations.length) * 100;

	return Math.round(percentageCompletion);
};

export const isInvitationEmailValid = (email: string, emailInvitations: string[]) => {
	const trimmedEmail = trim(email);

	if (!trimmedEmail.length) {
		return 'Provide an email address';
	}

	if (!isEmail(trimmedEmail)) {
		return `${trimmedEmail} is not a valid email address`;
	}

	if (isIn(trimmedEmail, emailInvitations)) {
		return `${trimmedEmail} is already added`;
	}

	return null;
};

export const transformToAvatarInitials = (name: string) => {
	return name
		.split(' ')
		.map(n => n[0].toUpperCase())
		.join('');
};

export const wait = (ms: number) => {
	return new Promise(resolve => setTimeout(resolve, ms));
};

export const isActivityNotification = (type: NotificationType) => {
	if (
		[
			NotificationType.ActivityInvitationSent,
			NotificationType.ActivityJoinRequest,
			NotificationType.UpcomingActivity
		].includes(type)
	) {
		return true;
	}

	return false;
};

export const isTripNotification = (type: NotificationType) => {
	if ([NotificationType.UpcomingTrip].includes(type)) {
		return true;
	}

	return false;
};
