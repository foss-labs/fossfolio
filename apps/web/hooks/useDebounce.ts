import { useCallback } from 'react';

const debounce = (fn: Function, ms = 2000) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    // eslint-disable-next-line func-names
    return function (this: any, ...args: any[]) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn.apply(this, args), ms);
    };
};

export const useDebounce = () => useCallback((func: Function) => debounce(func), []);
