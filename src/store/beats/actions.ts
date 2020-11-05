import { BeatsActionTypes, IBeatsAction } from './types';

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
