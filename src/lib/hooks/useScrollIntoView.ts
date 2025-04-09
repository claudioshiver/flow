import {useEffect, useRef} from "react";

const useScrollIntoView = function(scroll: boolean) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scroll && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [scroll]);

  return sectionRef;
}

export default useScrollIntoView;