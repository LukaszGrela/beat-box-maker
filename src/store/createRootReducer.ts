import { History } from 'history';
import { AnyAction, combineReducers, Reducer } from 'redux';
import {
  connectRouter,
  LocationChangeAction,
  RouterState,
} from 'connected-react-router';
import { IConfigAction, IConfigReducer } from './config/types';
import config from './config/reducer';
import { IBeatsAction, IBeatsReducer } from './beats/types';
import beats from './beats/reducer';

export type TAction =
  | AnyAction
  | LocationChangeAction
  | IConfigAction
  | IBeatsAction;

export type TStateObject = {
  beats: IBeatsReducer;
  config: IConfigReducer;
  router: RouterState;
};
export type TRootReducer = Reducer<TStateObject, TAction>;
const rootReducer = (history: History) =>
  combineReducers({
    beats,
    config,
    router: connectRouter(history),
  });

export default rootReducer;
