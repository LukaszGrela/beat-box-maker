import React from 'react';

export interface IProps {
  label: string;
  icon?: string;

  className?: string;
}

const InstrumentRow: React.FC<IProps> = ({
  label,
  icon,
  className,
}: IProps): JSX.Element => {
  const memoClassName = React.useMemo((): string => {
    if (className) {
      return `InstrumentRow ${className}`;
    }
    return 'InstrumentRow';
  }, [className]);
  return (
    <li className={memoClassName}>
      <span className="InstrumentRow_icon"></span>
      <span className="InstrumentRow_label">{label}</span>
      <span className="InstrumentRow_toolbox"></span>
    </li>
  );
};

export default InstrumentRow;
