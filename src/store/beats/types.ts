import { AnyAction } from 'redux';
export enum BeatsActionTypes {
  SET = 'beat-box-maker/beats/SET',
}
export enum BeatsInitActionTypes {
  INIT = 'beat-box-maker/beats/INIT',
}
export interface IBeatsAction extends AnyAction {
  type: BeatsActionTypes;

  x: number;
  y: number;
  instrumentId?: number;
}
export interface IBeatsInitAction extends AnyAction {
  type: BeatsInitActionTypes;

  columns: number;
  rows: number;
}
export interface IBeatsReducer {
  data: number[][];
}

export type TBeatsActions = IBeatsInitAction | IBeatsAction;
