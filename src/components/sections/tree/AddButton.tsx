'use client';

import {Button} from "@/components/ui/button";
import {Plus} from "lucide-react";
import {useTreeContext} from "@/components/providers/TreeProvider";

type AddButtonProps = {
  label: string;
  category: 'lyric' | 'tag';
}

const AddButton = ({label, category}: AddButtonProps) => {
  const {setAddingItem} = useTreeContext();

  return (
    <div className="flex justify-between items-center w-full">
      <span className="truncate">{label}</span>
      <Button
        size="icon"
        variant="ghost"
        className="h-6 w-6 hover:bg-accent shrink-0 ml-1"
        onClick={() => setAddingItem({category, item: null})}>
        <Plus className="h-4 w-4"/>
      </Button>
    </div>
  )
}

export default AddButton;