import React from "react";
import { LinearGradient } from "@visx/gradient";
import { ParentSize } from "@visx/responsive";
import { Grid as VisxGrid } from "@visx/grid";
import { background, background2 } from "../../config";
import { scaleLinear } from "@visx/scale";

export interface IProps {
  bgGradient?: string[];

  bars?: number;
  beatsPerBar?: number;
  splitBeat?: number;

  tileWidth?: number;
}

const Grid: React.FC<IProps> = ({
  bgGradient = [background, background2],
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
  const gridScale = scaleLinear<number>({
    domain: [0, columns],
    range: [0, tileWidth * columns],
    nice: true,
  });
  return (
    <ParentSize>
      {({ width, height }): JSX.Element => {
        const rowScale = scaleLinear<number>({
          domain: [0, 6],
          range: [0, height],
          nice: true,
        });
        return (
          <svg width={width} height={height}>
            <rect
              x={0}
              y={0}
              width={width}
              height={height}
              fill="url(#area-background-gradient)"
              rx={14}
            />
            <LinearGradient
              id="area-background-gradient"
              from={background}
              to={background2}
            />
            <VisxGrid
              xScale={gridScale}
              yScale={rowScale}
              width={tileWidth * columns}
              height={height}
              numTicksRows={6}
              numTicksColumns={columns}
            />
{/*             <GridColumns
              scale={gridScale}
              width={tileWidth * columns}
              height={height}
              numTicks={columns}
            />
            <GridRows
              scale={rowScale}
              width={tileWidth * columns}
              height={height}
              numTicks={6}
            /> */}
          </svg>
        );
      }}
    </ParentSize>
  );
};

export default Grid;
