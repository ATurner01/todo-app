import { useEffect } from 'react';

export function useMenu( setMenuOpen, menuRef  ) {

    useEffect(() => {

        if (!menuRef.current) {
            return;
        }

        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [setMenuOpen, menuRef]);
}