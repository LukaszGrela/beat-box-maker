import { connect } from 'react-redux';
import { TAppState } from '../store/types';
import BeatBoxMaker, { IProps } from './BeatBoxMaker';

type TStateProps = Pick<IProps, 'beats' | 'config'>;
const mapStateToProps = (state: TAppState): TStateProps => ({
  config: state.config,
  beats: state.beats,
});

export default connect(mapStateToProps, {})(BeatBoxMaker);
