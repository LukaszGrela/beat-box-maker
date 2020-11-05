import {
  BeatsActionTypes,
  TBeatsActions,
  IBeatsReducer,
  BeatsInitActionTypes,
} from './types';

const initialState: IBeatsReducer = {
  data: [],
};

const beats = (state = initialState, action: TBeatsActions): IBeatsReducer => {
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

    case BeatsInitActionTypes.INIT: {
      return {
        ...initialState,
        data: [...Array(action.rows)].map(() =>
          [...Array(action.columns)].map((i) => 0)
        ),
      };
    }

    default:
      return state;
  }
};

export default beats;
