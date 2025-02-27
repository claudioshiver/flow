import {ReactNode} from "react";

type SectionProps = {
  title: string;
  action?: ReactNode;
  children: ReactNode;
};

const Section = (props: SectionProps) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center h-14 px-2 border-b">
        <h1 className="text-xl font-bold text-primary px-2">{props.title}</h1>
        {props.action}
      </div>

      <div className="flex-1 p-2 overflow-y-auto">
        {props.children}
      </div>
    </div>
  );
}

export default Section;