import { routerMiddleware } from 'connected-react-router';
import { BrowserHistoryBuildOptions, createBrowserHistory } from 'history';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import createRootReducer from './createRootReducer';
import { TStore } from './types';

const basename = '';
const createBrowserHistoryArgs: BrowserHistoryBuildOptions = {
  ...(basename !== null ? { basename } : {}),
  // getUserConfirmation: (message, callback) => {
  //   console.log('getUserConfirmation', message);
  //   // display alert
  //   getStore().dispatch(
  //     pushModal({
  //       modalType: ModalTypes.SYSTEM_MODAL,
  //       modalId: 'PROMPT_MODAL_ID',
  //       modalBody: message,
  //       modalButtons: [
  //         {
  //           color: 'danger',
  //           label: pull Text('{{IdleModalContent_buttons_positive}}Stay'),
  //           action: dispatch => {
  //             dispatch(closeModalById('PROMPT_MODAL_ID'));
  //             // do default
  //             callback(true);
  //           },
  //         },
  //         {
  //           color: 'secondary',
  //           label: pull Text('{{IdleModalContent_buttons_negative}}Logout'),
  //           action: dispatch => {
  //             dispatch(closeModalById('PROMPT_MODAL_ID'));

  //             callback(false);
  //           },
  //         },
  //       ],
  //     })
  //   );
  // },
};

export const history = createBrowserHistory(createBrowserHistoryArgs);
// createBrowserHistory({
//   basename: '',             // The base URL of the app (see below)
//   forceRefresh: false,      // Set true to force full page refreshes
//   keyLength: 6,             // The length of location.key
//   // A function to use to confirm navigation with the user (see below)
//   getUserConfirmation: (message, callback) => callback(window.confirm(message))
// })

const middleware = [routerMiddleware(history), thunk];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const enhancers: any[] = [];
const composeEnhancers = composeWithDevTools({});

export const rootReducer = createRootReducer(history);

const store: TStore = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleware), ...enhancers)
);

export default store;
