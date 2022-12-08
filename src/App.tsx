import './App.css';
import { Suspense } from 'react';
import { CurrentConditions, ErrorBoundary } from './components';


function App() {

  return (
    <ErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <CurrentConditions />
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
