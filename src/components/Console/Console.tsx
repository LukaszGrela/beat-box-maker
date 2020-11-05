import React from 'react';
import { IInstrumentData } from '../../Instruments/Instruments';
import InstrumentRow from './InstrumentRow';

import './styles/index.scss';
import Tile from './Tile';

export interface IProps {
  instruments: IInstrumentData[];
  beats: number[][];

  bars?: number;
  beatsPerBar?: number;
  splitBeat?: number;

  tileWidth?: number;
  rowHeight?: number;
}

const Console: React.FC<IProps> = ({
  instruments,
  beats,
  bars = 4,
  beatsPerBar = 4,
  splitBeat = 2,
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
  return (
    <div className="Console">
      <ul className="Console_instruments">
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
          {beats
            .reduce((acc, current) => [...acc, ...current], [])
            .map(
              (item, index): React.ReactNode => (
                <Tile
                  key={index}
                  className={
                    Math.floor(index / columns) % 2 === 0 ? 'even' : 'odd'
                  }
                  selected={item}
                />
              )
            )}
        </div>
      </div>
    </div>
  );
};

export default Console;
