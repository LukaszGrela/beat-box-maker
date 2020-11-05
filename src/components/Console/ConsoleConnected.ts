import { connect } from 'react-redux';
import { setBeat } from '../../store/beats/actions';
import { TAppState, TDispatch } from '../../store/types';
import Console, { IOwnProps, IProps } from './Console';

type TStateProps = Pick<IProps, 'bars' | 'beats' | 'beatsPerBar' | 'splitBeat'>;
const mapStateToProps = (state: TAppState): TStateProps => ({
  bars: state.config.bars,
  beatsPerBar: state.config.beatsPerBar,
  splitBeat: state.config.splitBeat,

  beats: state.beats.data,
});

type TDispatchProps = Pick<IProps, 'onTap'>;
const mapDispatchToProps = (
  dispatch: TDispatch,
  ownProps: IOwnProps
): TDispatchProps => ({
  onTap: (
    instrument: string,
    instrumentId: number,
    x: number,
    y: number
  ): void => {
    console.log('onTap', instrument, x, y);
    dispatch(setBeat(instrumentId, x, y));
    ownProps.playInstrument(instrument);
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Console);
