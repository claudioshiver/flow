'use client';

import * as React from "react";
import {useEffect, useRef} from "react";
import {Note} from "@/lib/types/Note";

type AutoScrollItemProps = {
  notes?: Note[];
}

const AutoScrollItem = ({notes}: AutoScrollItemProps) => {
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({behavior: "instant"});
  }, [notes]);

  return (
      <div ref={endRef}/>
  );
}

export default AutoScrollItem;