import { AnyAction } from 'redux';

export enum ConfigActionTypes {
  RESET = 'beat-box-maker/config/RESET',
  SET = 'beat-box-maker/config/SET',
}

export interface IConfigAction extends AnyAction {
  type: ConfigActionTypes;

  bars: number;
  beatsPerBar: number;
  splitBeat: number;
}

export interface IConfigReducer {
  bars: number;
  beatsPerBar: number;
  splitBeat: number;
}
