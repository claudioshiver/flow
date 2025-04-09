'use client';

import {ReactNode, RefObject, useCallback, useRef} from 'react';
import {createContext, useContext, useMemo} from 'react';

export type ScrollContextType = {
  containerRef: RefObject<HTMLDivElement | null> | null;
  targetRef: RefObject<HTMLDivElement | null> | null;
  scrollIntoView: () => void;
}

const ScrollContext = createContext<ScrollContextType>({
  containerRef: null,
  targetRef: null,
  scrollIntoView: () => undefined,
});

const ScrollProvider = function ({children}: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);

  const scrollIntoView = useCallback(() => {
    if (!containerRef.current || !targetRef.current) return;

    const offsetTop = targetRef.current.offsetTop;

    containerRef.current.scroll({
      top: offsetTop,
      behavior: "smooth",
    });
  }, []);

  const context = useMemo(() => ({
    containerRef,
    targetRef,
    scrollIntoView,
  }), [scrollIntoView]);

  return (
    <ScrollContext.Provider value={context}>
      {children}
    </ScrollContext.Provider>
  );
}

export const useScrollContext = function () {
  const context = useContext(ScrollContext);
  if (!context) throw new Error('useScrollContext must be used within a ScrollProvider');
  return context;
}

export default ScrollProvider;
