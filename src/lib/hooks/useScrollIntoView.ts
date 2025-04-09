import {useLayoutEffect, useRef} from "react";

const useScrollIntoView = function(scroll: boolean) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (scroll && ref.current) {
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [scroll]);

  return ref;
}

export default useScrollIntoView;