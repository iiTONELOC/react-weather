import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export type IsMountedType = {
    isMounted: boolean | null;
    setIsMounted: Dispatch<SetStateAction<boolean | null>>;
};


export default function useIsMounted(): {
    isMounted: boolean | null;
    setIsMounted: Dispatch<SetStateAction<boolean | null>>;
} { //NOSONAR
    const [isMounted, setIsMounted] = useState<boolean | null>(null);

    useEffect(() => {
        !isMounted && setIsMounted(true);
        return () => {
            isMounted && setIsMounted(false);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return { isMounted, setIsMounted };
}
