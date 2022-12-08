import './App.css';
import { Suspense } from 'react';
import { CurrentConditions, Loading } from '../components';


export default function App() {
    return (
        <Suspense fallback={<Loading />}>
            <CurrentConditions />
        </Suspense>
    );
}
