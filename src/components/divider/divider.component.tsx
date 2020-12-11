import * as S from './divider.styled';

export default function Divider({ children }: { children?: React.ReactNode }) {
	return <S.Divider>{children && <S.DividerWithText>{children}</S.DividerWithText>}</S.Divider>;
}
