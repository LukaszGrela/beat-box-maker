import { connect } from 'react-redux';
import Console, { IProps } from './Console';

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

export default connect(mapStateToProps, {})(Console);
