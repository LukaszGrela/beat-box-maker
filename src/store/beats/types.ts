import { AnyAction } from 'redux';
export enum BeatsActionTypes {
  SET = 'beat-box-maker/beats/SET',
}
export interface IBeatsAction extends AnyAction {
  type: BeatsActionTypes;

  x: number;
  y: number;
  instrumentId?: number;
}
export interface IBeatsReducer {
  data: number[][];
}
