import React from 'react';

export interface IProps {
  selected: boolean;

  className?: string;
  id?: string;
}

const ColumnHeader: React.FC<IProps> = ({
  selected,
  className,
  id,
}: IProps): JSX.Element => {
  const memoClassName = React.useMemo((): string => {
    let output = 'ColumnHeader';

    if (selected) {
      output = `${output} hilighted`;
    }

    if (className) {
      output = `${output} ${className}`;
    }

    return output;
  }, [className, selected]);
  return (
    // eslint-disable-next-line eqeqeq
    <div className={memoClassName} id={id != undefined ? `${id}` : undefined}>
      {' '}
    </div>
  );
};

export default ColumnHeader;
