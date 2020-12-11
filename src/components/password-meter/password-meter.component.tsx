// import { STRENGTH } from '../../utils/constants';

import * as S from './password-meter.styled';

function PasswordMeter({ passwordStrength }: { passwordStrength: string }) {
	return (
		<S.Content>
			<S.StrengthMeter value={passwordStrength}></S.StrengthMeter>
			{/* {passwordStrength && <S.StrengthLabel value={passwordStrength}>{STRENGTH[passwordStrength]}</S.StrengthLabel>} */}
		</S.Content>
	);
}

export default PasswordMeter;
