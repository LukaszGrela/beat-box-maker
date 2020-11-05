import { BeatsActionTypes, IBeatsAction, IBeatsReducer } from './types';

const initialState: IBeatsReducer = {
  data: [],
};

const beats = (state = initialState, action: IBeatsAction): IBeatsReducer => {
  switch (action.type) {
    case BeatsActionTypes.SET: {
      const newState = {
        ...state,
        data: state.data.map((row) => [...row]),
      };
      const { x, y, instrumentId } = action;
      // set (or unset) selected instrument
      if (
        y >= 0 &&
        y < newState.data.length &&
        x >= 0 &&
        x < newState.data[0].length
      ) {
        newState.data[y][x] = instrumentId || 0;
      }
      return newState;
    }

    default:
      return state;
  }
};

export default beats;
