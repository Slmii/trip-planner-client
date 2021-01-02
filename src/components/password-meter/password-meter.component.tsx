import { Styled } from '@components/password-meter';

function PasswordMeter({ passwordStrength }: { passwordStrength: string }) {
	return (
		<Styled.Content>
			<Styled.StrengthMeter value={passwordStrength}></Styled.StrengthMeter>
		</Styled.Content>
	);
}

export default PasswordMeter;
