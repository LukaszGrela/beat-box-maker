import React from 'react';

export interface IProps {
  selected: number;

  className?: string;
  id?: string;
}

const Tile: React.FC<IProps> = ({
  selected,
  className,
  id,
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
    // eslint-disable-next-line eqeqeq
    <div className={memoClassName} id={id != undefined ? `${id}` : undefined}>
      {selected > 0 ? (
        <span role="img" aria-label="drum">
          🥁
        </span>
      ) : undefined}
    </div>
  );
};

export default Tile;
