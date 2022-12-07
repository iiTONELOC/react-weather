import './App.css';
import { Suspense } from 'react';
import { CurrentConditions } from './components';


function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CurrentConditions />
    </Suspense>
  );
}

export default App;
