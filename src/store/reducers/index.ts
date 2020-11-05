import { History } from 'history';
import { AnyAction, combineReducers, Reducer } from 'redux';
import {
  connectRouter,
  LocationChangeAction,
  RouterState,
} from 'connected-react-router';

export type TAction = AnyAction | LocationChangeAction;

export type TStateObject = {
  router: RouterState;
};
export type TRootReducer = Reducer<TStateObject, TAction>;
const rootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
  });

export default rootReducer;
