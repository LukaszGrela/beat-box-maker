import { ConfigActionTypes, IConfigAction, IConfigReducer } from './types';

const initialState: IConfigReducer = {
  bars: 4,
  beatsPerBar: 4,
  splitBeat: 2,
};

const config = (
  state = initialState,
  action: IConfigAction
): IConfigReducer => {
  switch (action.type) {
    case ConfigActionTypes.RESET:
      return {
        ...initialState,
      };

    default:
      return state;
  }
};

export default config;
