import React from 'react';
import { IInstrumentData } from '../../Instruments/Instruments';
import { arrayHasContent } from '../../shared/types';
import ColumnHeader from './ColumnHeader';
import InstrumentRow from './InstrumentRow';

import './styles/index.scss';
import Tile from './Tile';

export interface IOwnProps {
  instruments: IInstrumentData[];

  playInstrument: (instrument: string) => void;
}

export interface IProps extends IOwnProps {
  beats: number[][];

  activeColumn?: number;

  bars: number;
  beatsPerBar: number;
  splitBeat: number;

  onTap: (
    instrument: string,
    instrumentId: number,
    x: number,
    y: number
  ) => void;
}

const Console: React.FC<IProps> = ({
  instruments,
  beats,
  onTap,
  bars,
  beatsPerBar,
  splitBeat,
  activeColumn,
}: IProps): JSX.Element => {
  const columns = React.useMemo((): number => bars * beatsPerBar * splitBeat, [
    bars,
    beatsPerBar,
    splitBeat,
  ]);
  const rows = React.useMemo((): number => instruments.length, [instruments]);
  const gridTemplateRows = React.useMemo(
    (): string => `repeat(${rows}, 4rem)`,
    [rows]
  );
  const gridTemplateColumns = React.useMemo(
    (): string => `repeat(${columns}, 6rem)`,
    [columns]
  );

  React.useEffect((): (() => void) => {
    const mouseDown = (e: MouseEvent): void => {
      if (e.target instanceof HTMLElement) {
        const target = e.target as HTMLElement;
        if (target.id) {
          const [component, instrument, x, y, instrumentId] = target.id.split(
            '-'
          );
          if (component === 'Tile') {
            const selected = beats[Number(y)][Number(x)] !== 0;
            onTap(
              selected ? '' : instrument,
              selected ? 0 : Number(instrumentId),
              Number(x),
              Number(y)
            );
          }
        }
      }
    };
    window.addEventListener('mousedown', mouseDown);
    return (): void => {
      window.removeEventListener('mousedown', mouseDown);
    };
  }, [onTap, beats]);

  const memoTiles = React.useMemo(
    (): React.ReactNode =>
      arrayHasContent(beats) &&
      arrayHasContent(instruments) &&
      beats
        .reduce((acc, current) => [...acc, ...current], [])
        .map(
          (item, index): React.ReactNode => {
            const x = index % columns;
            const y = Math.floor(index / columns);

            const id = `Tile-${instruments[y].label}-${x}-${y}-${instruments[y].id}`;
            return (
              <Tile
                key={id}
                id={id}
                className={y % 2 === 0 ? 'even' : 'odd'}
                selected={item}
              />
            );
          }
        ),
    [beats, instruments, columns]
  );

  return (
    <div className="Console">
      <ul className="Console_instruments">
        <li className="InstrumentRow">Toolbox</li>
        {instruments.map(
          (data, index): React.ReactNode => (
            <InstrumentRow
              key={`${data.label}-${index}`}
              className={index % 2 === 0 ? 'even' : 'odd'}
              label={data.label}
            />
          )
        )}
      </ul>
      <div className="Console_beats">
        <div
          className="Console_beats_grid"
          style={{
            gridTemplateRows,
            gridTemplateColumns,
          }}
        >
          {/* Headers */}
          {arrayHasContent(beats) &&
            arrayHasContent(instruments) &&
            beats[0].map(
              (_, index): React.ReactNode => {
                const x = index % columns;

                const id = `Column-${x}`;
                return (
                  <ColumnHeader
                    key={id}
                    id={id}
                    className={'odd'}
                    selected={activeColumn === x}
                  />
                );
              }
            )}
          {memoTiles}
        </div>
      </div>
    </div>
  );
};

export default Console;
