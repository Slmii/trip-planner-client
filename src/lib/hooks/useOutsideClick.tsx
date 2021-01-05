import { MutableRefObject, useEffect } from 'react';

export default function useOutsideClick(ref: MutableRefObject<HTMLElement | null>, cb: () => void) {
	useEffect(() => {
		// Hide ProfileDropdown when clicked outside of element
		function handleClickOutside(event: MouseEvent) {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				cb();
			}
		}

		// Bind the event listener
		document.addEventListener('mousedown', handleClickOutside);

		// Unbind the event listener on clean up
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [cb, ref]);
}
