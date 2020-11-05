import { AnyAction, Store } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import store, { rootReducer } from '.';

export const guardAnyAction = (test: unknown): test is AnyAction => {
  return test && (test as Object).hasOwnProperty('type');
};
export type TAppState = ReturnType<typeof rootReducer>;
export type TAnyThunkAction = ThunkAction<
  unknown,
  TAppState,
  unknown,
  AnyAction
>;
export type TDispatch = ThunkDispatch<TAppState, unknown, AnyAction>;
export type TStore = Store<TAppState, AnyAction> & {
  dispatch: TDispatch;
  getState?: TGetState;
};
export type TGetState = () => TAppState;

// helper to get typed store
export const getStore: () => TStore = (): TStore => store as TStore;
