/* eslint-disable @typescript-eslint/no-empty-function */
import { IS_SERVER } from '@lib/constants';
import { useRouter } from 'next/router';
import { createContext, useState } from 'react';

interface ContextProps {
	page: number;
	setPage: (page: number) => void;
}

export const PaginationContext = createContext<ContextProps>({
	page: 0,
	setPage: () => {}
});

const PaginationContextProvider = ({ children }: { children: React.ReactNode }) => {
	const router = useRouter();
	const { page: pageNr } = router.query;

	const [page, setPage] = useState(pageNr ? Number(pageNr[0]) - 1 : 0);

	return (
		<PaginationContext.Provider
			value={{
				page,
				setPage: page => setPage(page)
			}}
		>
			{children}
		</PaginationContext.Provider>
	);
};

export default PaginationContextProvider;
