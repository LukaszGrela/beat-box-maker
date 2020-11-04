import React from "react";
import { IInstrumentData } from "../../Instruments/Instruments";
import {
  FixedSizeGrid,
  FixedSizeList,
  GridChildComponentProps,
  ListChildComponentProps,
} from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import InstrumentRow from "./InstrumentRow";

import "./styles/index.scss";

export interface IProps {
  instruments: IInstrumentData[];
  beats: number[][];

  bars?: number;
  beatsPerBar?: number;
  splitBeat?: number;

  tileWidth?: number;
  rowHeight?: number;
}

const renderInstrument = (
  data: IInstrumentData[]
): ((props: ListChildComponentProps) => JSX.Element) => (
  props: ListChildComponentProps
): JSX.Element => (
  <InstrumentRow
    className={props.index % 2 === 0 ? "even" : "odd"}
    {...props}
    label={data[props.index].label}
  />
);

const renderBeat = (
  data: number[][]
): ((props: GridChildComponentProps) => JSX.Element) => ({
  columnIndex,
  rowIndex,
  style,
}: GridChildComponentProps): JSX.Element => (
  <div className={rowIndex % 2 === 0 ? "even" : "odd"} style={style}>
    Item {rowIndex},{columnIndex}
  </div>
);

const Console: React.FC<IProps> = ({
  instruments,
  beats,
  rowHeight = 48,
  bars = 4,
  beatsPerBar = 4,
  splitBeat = 2,
  tileWidth = 40,
}: IProps): JSX.Element => {
  const columns = React.useMemo((): number => bars * beatsPerBar * splitBeat, [
    bars,
    beatsPerBar,
    splitBeat,
  ]);
  const rows = React.useMemo((): number => instruments.length, [instruments]);
  return (
    <div className="Console">
      <div className="Console_instruments">
        <AutoSizer>
          {({ width, height }) => (
            <FixedSizeList
              className="Console_instruments_list"
              itemCount={rows}
              itemSize={rowHeight}
              width={width}
              height={height}
            >
              {renderInstrument(instruments)}
            </FixedSizeList>
          )}
        </AutoSizer>
      </div>
      <div className="Console_beats">
        <AutoSizer>
          {({ width, height }) => (
            <FixedSizeGrid
              className="Console_beats_grid"
              width={width}
              height={height}
              columnCount={columns}
              rowCount={rows}
              rowHeight={rowHeight}
              columnWidth={tileWidth}
            >
              {renderBeat(beats)}
            </FixedSizeGrid>
          )}
        </AutoSizer>
      </div>
    </div>
  );
};

export default Console;
