import './App.css';
import { Suspense } from 'react';
import { CurrentConditions, Loading } from '../components';


export default function App(): JSX.Element {
    return (
        <Suspense fallback={<Loading />}>
            <CurrentConditions />
        </Suspense>
    );
}
