import { RefObject, useCallback, useEffect } from 'react';

const useClickOutSide = (ref: RefObject<HTMLElement>, callback: () => void) => {
  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        callback();
      }
    },
    [callback, ref],
  );

  useEffect(() => {
    window.addEventListener('mousedown', handleClick);
    return () => {
      window.removeEventListener('mousedown', handleClick);
    };
  }, [handleClick]);
};

export default useClickOutSide;
