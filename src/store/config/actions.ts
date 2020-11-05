import { ConfigActionTypes, IConfigAction } from './types';

export const setConfigDefaults = (
  bars: number,
  beatsPerBar: number,
  splitBeat: number
): IConfigAction => ({
  type: ConfigActionTypes.RESET,

  bars,
  beatsPerBar,
  splitBeat,
});
