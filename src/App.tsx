import React from 'react';
import { start as toneStart, context as toneContext } from 'tone';
import './App.css';
import { useMount } from './hooks/useMount';

const App: React.FC = (): JSX.Element => {
  const [initiated, setInitiated] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  // const downHandler = (e: KeyboardEvent): void => {  };
  // const upHandler = (e: KeyboardEvent): void => {};
  useMount((): (() => void) => {
    // window.addEventListener('keydown', downHandler);
    // window.addEventListener('keyup', upHandler);
    return (): void => {
      // window.removeEventListener('keydown', downHandler);
      // window.removeEventListener('keyup', upHandler);
    };
  });

  return (
    <div className='App'>
      <header className='App-header'>
        <p>Beat Box Maker</p>
      </header>

      <section className='App-section'>
        <div className='keys'>
          {loading && <p>LOADING...</p>}
          
          {!loading && !initiated && (
            <button
              className='tap-to-start'
              onClick={async () => {
                await toneStart();
                toneContext.resume();
                setInitiated(true);
              }}
            >
              Tap to start
            </button>
          )}
        </div>
      </section>
    </div>
  );
};

export default App;
