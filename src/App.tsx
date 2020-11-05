import React from 'react';
import { useDispatch } from 'react-redux';
import { start as toneStart, context as toneContext } from 'tone';
import './App.css';
import ConsoleConnected from './components/Console/ConsoleConnected';
import { useMount } from './hooks/useMount';
import Instruments from './Instruments/Instruments';
import { initBeatData } from './store/beats/actions';
import { setConfigDefaults } from './store/config/actions';
import { TDispatch } from './store/types';

const App: React.FC = (): JSX.Element => {
  const [initiated, setInitiated] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const players = React.useRef<Instruments>(new Instruments());
  const dispatch = useDispatch<TDispatch>();
  React.useEffect((): void => {
    if (initiated) {
      players.current.load((): void => {
        setLoading(false);
      });
    }
  }, [initiated, players]);

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
    <div className="App">
      <header className="App-header">
        <p>Beat Box Maker</p>
      </header>

      <section className="App-section">
        <div className="beats">
          {loading && <p>LOADING...</p>}
          {!loading && initiated && (
            <ConsoleConnected
              instruments={players.current.instruments}
              playInstrument={(instrument: string): void => {
                console.log('App.playInstrument', instrument);
                players.current.play(instrument);
              }}
            />
          )}
          {!loading && !initiated && (
            <button
              className="tap-to-start"
              onClick={async () => {
                await toneStart();
                toneContext.resume();
                dispatch(setConfigDefaults(4, 4, 2));
                dispatch(
                  initBeatData(4 * 4 * 2, players.current.instruments.length)
                );
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
