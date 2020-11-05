import { AnyAction } from 'redux';

/**
 * Generic dictionary type
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface IDictionary<T = any> {
  [key: string]: T;
  [key: number]: T;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface IStringKeyDictionary<T = any> {
  [key: string]: T;
}

/**
 * Base action with an error option
 */
export interface IFailureAction extends AnyAction {
  // error?: IErrorObject;
}

/**
 * Base reducer with `loading` and `error` props
 */
export interface IBaseReducer {
  loading: boolean;
  // error?: IErrorObject;
}

/**
 * Type Guard that assures the array is defined (not undefined or null) and has content (length > 0)
 * @param array Any array type
 */
export const arrayHasContent = <T>(
  array: T[] | null | undefined
): array is T[] => {
  return Array.isArray(array) && array.length > 0;
};

/**
 * Generic promise
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TAnyPromise<T = any> = Promise<T>;

export type TSortOrder = 'asc' | 'desc' | undefined;

/**
 * Sorting (state) props, generic `S` allows to pass the `sortBy` type
 */
export interface ISorting<S = string> {
  sortBy?: S;
  sortOrder?: TSortOrder;
}

export function isString(x: any): x is string {
  return typeof x === 'string';
}
