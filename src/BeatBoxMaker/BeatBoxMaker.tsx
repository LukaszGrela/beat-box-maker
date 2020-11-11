import React from 'react';
import { useDispatch } from 'react-redux';
import {
  start as toneStart,
  context as toneContext,
  Transport,
  Draw,
} from 'tone';
import Console from '../components/Console/Console';
import { useMount } from '../hooks/useMount';
import Instruments from '../Instruments/Instruments';
import { arrayHasContent } from '../shared/types';
import { initBeatData, setBeat } from '../store/beats/actions';
import { IBeatsReducer } from '../store/beats/types';
import { setConfigDefaults } from '../store/config/actions';
import { IConfigReducer } from '../store/config/types';
import { TDispatch } from '../store/types';
import { getPattern } from '../utils/get-pattern';
import './styles/index.scss';

export interface IProps {
  config: IConfigReducer;
  beats: IBeatsReducer;
}

const BeatBoxMaker: React.FC<IProps> = ({
  config,
  beats,
}: IProps): JSX.Element => {
  const [initiated, setInitiated] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [playing, setPlaying] = React.useState(false);
  const [playedColumn, setPlayedColumn] = React.useState<number>();
  const players = React.useRef<Instruments>(new Instruments());
  const dispatch = useDispatch<TDispatch>();

  React.useEffect((): void => {
    if (initiated) {
      players.current.load((): void => {
        setLoading(false);
      });
    }
  }, [initiated, players]);

  const { bars, beatsPerBar, splitBeat } = config;
  const { data, hasPatterns } = beats;
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
              console.log('tick', index, time, Transport.position);
              setPlayedColumn(index);
              const pattern = getPattern(data, index);
              if (pattern.length > 0) {
                pattern.forEach((instrument) => {
                  players.current.play(instrument);
                });
              }
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
                disabled={!hasPatterns}
                className="tap-to-play"
                onClick={() => {
                  if (Transport.state === 'stopped') {
                    Transport.start('+0.1');
                    setPlaying(true);
                  } else {
                    Transport.stop();
                    setPlaying(false);
                    setPlayedColumn(undefined);
                  }
                }}
              >
                {playing ? 'Stop' : 'Play'}
              </button>{' '}
              <button
                disabled={!hasPatterns}
                className="tap-to-play"
                onClick={() => {
                  dispatch(
                    initBeatData(
                      bars * beatsPerBar * splitBeat,
                      players.current.instruments.length
                    )
                  );
                }}
              >
                Reset
              </button>
              <Console
                activeColumn={playedColumn}
                bars={bars}
                beatsPerBar={bars}
                splitBeat={splitBeat}
                beats={data}
                instruments={players.current.instruments}
                playInstrument={(instrument: string): void => {
                  console.log('App.playInstrument', instrument);
                  if (Transport.state === 'stopped') {
                    players.current.play(instrument);
                  }
                }}
                onTap={(
                  instrument: string,
                  instrumentId: number,
                  x: number,
                  y: number
                ): void => {
                  console.log('onTap', instrument, x, y);
                  dispatch(setBeat(instrumentId, x, y));
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
