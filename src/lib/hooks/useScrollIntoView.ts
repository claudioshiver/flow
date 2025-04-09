import {useLayoutEffect, useRef} from "react";

const useScrollIntoView = function(scroll: boolean) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (scroll && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [scroll]);

  return sectionRef;
}

export default useScrollIntoView;