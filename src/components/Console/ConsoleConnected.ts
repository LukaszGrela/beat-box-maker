import { connect } from 'react-redux';
import { TDispatch } from '../../store/types';
import Console, { IOwnProps, IProps } from './Console';

type TStateProps = Pick<
  IProps,
  'bars' | 'beats' | 'beatsPerBar' | 'rowHeight' | 'splitBeat' | 'tileWidth'
>;
const mapStateToProps = (): TStateProps => ({
  rowHeight: 48,
  bars: 4,
  beatsPerBar: 4,
  splitBeat: 2,
  tileWidth: 40,
  beats: [...Array(9)].map(() => [...Array(32)].map((i) => 0)),
});

type TDispatchProps = Pick<IProps, 'onTap'>;
const mapDispatchToProps = (
  dispatch: TDispatch,
  ownProps: IOwnProps
): TDispatchProps => ({
  onTap: (instrument: string, x: number, y: number): void => {
    console.log('onTap', instrument, x, y);
    ownProps.playInstrument(instrument);
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Console);
