import { Styled } from '@components/divider';

export default function Divider({ children }: { children?: React.ReactNode }) {
	return <Styled.Divider>{children && <Styled.DividerWithText>{children}</Styled.DividerWithText>}</Styled.Divider>;
}
