import { ConfigActionTypes, IConfigAction } from './types';

export const setConfigDefaults = (): IConfigAction => ({
  type: ConfigActionTypes.RESET,
});
