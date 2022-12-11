import { useState, useEffect } from 'react';

export default function useIsLandscape(): boolean {
    const [isLandscape, setIsLandscape] = useState<boolean>(false);

    useEffect(() => {
        const handleResize = (): void => {
            setIsLandscape(window.innerWidth > window.innerHeight);
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return isLandscape;
}
