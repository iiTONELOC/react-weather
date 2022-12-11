import { useEffect, useState } from 'react';
import { formatCurrentTime } from './helpers';


export default function CurrentTime(): JSX.Element {
    const [time, setTime] = useState<string>(formatCurrentTime());

    // updates the time every interval seconds
    const clockUpdater = (interval: number): NodeJS.Timeout => setInterval(
        () => setTime(formatCurrentTime()), interval);

    useEffect(() => {
        // update the time every 5 seconds
        const interval: NodeJS.Timeout = clockUpdater(5000); // NOSONAR

        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {time}
        </>
    );
}
