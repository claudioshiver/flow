import {ReactNode} from "react";

type SectionProps = {
  title: string;
  before?: ReactNode;
  after?: ReactNode;
  children: ReactNode;
};

const Section = (props: SectionProps) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex gap-2 justify-between items-center h-14 px-2 border-b">
        {props.before}
        <strong className="flex-1 text-xl font-bold text-primary px-2 truncate">
          {props.title}
        </strong>
        {props.after}
      </div>

      <div className="flex-1 p-2 overflow-y-auto">
        {props.children}
      </div>
    </div>
  );
}

export default Section;