import { useEffect, EffectCallback } from 'react';
export const useMount = (f: EffectCallback): void => useEffect(f, []);
