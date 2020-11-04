import React from 'react';
import { ListChildComponentProps } from 'react-window';

export interface IProps extends ListChildComponentProps {
  label: string;
  icon?: string;

  className?: string;
}

const InstrumentRow: React.FC<IProps> = ({
  label,
  icon,
  style,
  className,
}: IProps): JSX.Element => {
  const memoClassName = React.useMemo((): string => {
    if (className) {
      return `InstrumentRow ${className}`;
    }
    return 'InstrumentRow';
  }, [className]);
  return (
    <div className={memoClassName} style={style}>
      <span className="InstrumentRow_icon"></span>
      <span className="InstrumentRow_label">{label}</span>
      <span className="InstrumentRow_toolbox"></span>
    </div>
  );
};

export default InstrumentRow;
