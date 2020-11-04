import React from 'react';
import { GridChildComponentProps } from 'react-window';

export interface IProps extends GridChildComponentProps {
  selected: number;

  className?: string;
}

const Tile: React.FC<IProps> = ({
  selected,
  style,
  className,
}: IProps): JSX.Element => {
  const memoClassName = React.useMemo((): string => {
    let output = 'Tile';

    if (selected) {
      output = `${output} selected`;
    }

    if (className) {
      output = `${output} ${className}`;
    }

    return output;
  }, [className, selected]);
  return (
    <div className={memoClassName} style={style}>
      {' '}
    </div>
  );
};

export default Tile;
