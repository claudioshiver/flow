import {Button} from "@/components/ui/button";
import {Plus} from "lucide-react";

type AddButtonProps = {
  label: string;
  type: 'lyric' | 'tag';
  setAddingTo: (addingTo: {type: "lyric" | "tag", parentId: string | null}) => void;
}

const AddButton = ({label, type, setAddingTo}: AddButtonProps) => {
  return (
    <div className="flex justify-between items-center w-full">
      <span className="truncate">{label}</span>
      <Button
        size="icon"
        variant="ghost"
        className="h-6 w-6 hover:bg-accent shrink-0 ml-1"
        onClick={() => setAddingTo({type, parentId: null})}>
        <Plus className="h-4 w-4"/>
      </Button>
    </div>
  )
}

export default AddButton;