import React from 'react';

export interface IProps {
  selected: number;

  className?: string;
}

const Tile: React.FC<IProps> = ({
  selected,
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
  return <div className={memoClassName}> </div>;
};

export default Tile;
