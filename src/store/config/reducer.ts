import { ConfigActionTypes, IConfigAction, IConfigReducer } from './types';

const initialState: IConfigReducer = {
  bars: 1,
  beatsPerBar: 1,
  splitBeat: 1,
};

const config = (
  state = initialState,
  action: IConfigAction
): IConfigReducer => {
  switch (action.type) {
    case ConfigActionTypes.RESET: {
      const { bars, beatsPerBar, splitBeat } = action;
      return {
        ...initialState,
        bars,
        beatsPerBar,
        splitBeat,
      };
    }

    default:
      return state;
  }
};

export default config;
