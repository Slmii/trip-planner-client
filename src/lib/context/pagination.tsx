import { useRouter } from 'next/router';
import { createContext, useEffect, useState } from 'react';

interface ContextProps {
	page: number;
	setPage: (page: number) => void;
}

export const PaginationContext = createContext<ContextProps>({
	page: 0,
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	setPage: () => {}
});

const PaginationContextProvider = ({ children }: { children: React.ReactNode }) => {
	const router = useRouter();
	const [page, setPage] = useState(1);

	useEffect(() => {
		if (router.query.page) {
			const currentPage = ((router.query.page as unknown) as number) || 1;
			setPage(currentPage);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

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
