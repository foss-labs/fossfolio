import { useCallback, useState } from 'react';

export const useToggle = (t = false) => {
    const [state, setToggle] = useState(t);

    const on = useCallback(() => {
        setToggle(true);
    }, []);

    const off = useCallback(() => {
        setToggle(false);
    }, []);

    const toggle = useCallback(() => {
        setToggle((el) => !el);
    });
    return [
        state,
        {
            on,
            off,
            toggle,
        },
    ];
};
