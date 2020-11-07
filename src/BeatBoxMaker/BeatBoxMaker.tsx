import React from 'react';
import { useDispatch, useStore } from 'react-redux';
import {
  start as toneStart,
  context as toneContext,
  Transport,
  Draw,
} from 'tone';
import ConsoleConnected from '../components/Console/ConsoleConnected';
import { useMount } from '../hooks/useMount';
import Instruments from '../Instruments/Instruments';
import { arrayHasContent } from '../shared/types';
import { initBeatData } from '../store/beats/actions';
import { setConfigDefaults } from '../store/config/actions';
import { TDispatch, TAppState } from '../store/types';
import './styles/index.scss';

const BeatBoxMaker: React.FC = (): JSX.Element => {
  const [initiated, setInitiated] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const players = React.useRef<Instruments>(new Instruments());
  const dispatch = useDispatch<TDispatch>();
  const store = useStore<TAppState>();
  React.useEffect((): void => {
    if (initiated) {
      players.current.load((): void => {
        setLoading(false);
      });
    }
  }, [initiated, players]);

  const { config, beats } = store.getState();

  const { bars, beatsPerBar, splitBeat } = config;
  const { data } = beats;
  React.useEffect((): (() => void) => {
    Transport.setLoopPoints(0, `${bars}m`);
    Transport.loop = true;
    const cancelIds: number[] = [];
    const time: { bar: number; quarter: number; sixteenth: number } = {
      bar: 0,
      quarter: 0,
      sixteenth: 0,
    };

    arrayHasContent(data) &&
      data[0].forEach((_, index): void => {
        console.log(index, `${time.bar}:${time.quarter}:${time.sixteenth}`);
        cancelIds.push(
          Transport.schedule((time) => {
            // Draw.schedule takes a callback and a time to invoke the callback
            Draw.schedule(() => {
              // the callback synced to the animation frame at the given time
              console.log(
                'tick',
                index,
                time,
                data[0][index],
                Transport.position
              );
            }, time);
          }, `${time.bar}:${time.quarter}:${time.sixteenth}`)
        );
        // advance
        time.sixteenth += 4 / splitBeat; // 4/1, 4/2, 4/4
        if (time.sixteenth > 3) {
          time.sixteenth = 0;
          time.quarter += 4 / beatsPerBar;
          if (time.quarter > 3) {
            time.bar++;
            time.quarter = 0;
          }
        }
      });

    return (): void => {
      cancelIds.forEach((id) => Transport.clear(id));
    };
  }, [data, bars, beatsPerBar, splitBeat]);

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
            <>
              <button
                className="tap-to-play"
                onClick={() => {
                  if (Transport.state === 'stopped') {
                    Transport.start('+0.1');
                  } else {
                    Transport.stop();
                  }
                }}
              >
                Play
              </button>
              <ConsoleConnected
                instruments={players.current.instruments}
                playInstrument={(instrument: string): void => {
                  console.log('App.playInstrument', instrument);
                  if (Transport.state === 'stopped') {
                    players.current.play(instrument);
                  }
                }}
              />
            </>
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

export default BeatBoxMaker;
