import {
  BeatsActionTypes,
  BeatsInitActionTypes,
  IBeatsAction,
  IBeatsInitAction,
} from './types';

export const setBeat = (
  instrumentId: number,
  x: number,
  y: number
): IBeatsAction => ({
  type: BeatsActionTypes.SET,

  x,
  y,
  instrumentId,
});

export const initBeatData = (
  columns: number,
  rows: number
): IBeatsInitAction => ({
  type: BeatsInitActionTypes.INIT,
  columns,
  rows,
});
