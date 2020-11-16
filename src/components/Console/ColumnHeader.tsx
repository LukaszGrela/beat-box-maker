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
  const ref = React.useRef<HTMLDivElement>(null);
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
  React.useLayoutEffect((): void => {
    if (selected && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selected]);
  return (
    <div
      ref={ref}
      className={memoClassName}
      // eslint-disable-next-line eqeqeq
      id={id != undefined ? `${id}` : undefined}
    >
      {' '}
    </div>
  );
};

export default ColumnHeader;
