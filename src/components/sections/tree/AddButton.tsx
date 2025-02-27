import {Button} from "@/components/ui/button";
import {Plus} from "lucide-react";

type AddButtonProps = {
  label: string;
  setAddingTo: (addingTo: {type: "lyric" | "tag", parentId: string | null}) => void;
}

const AddButton = ({label, setAddingTo}: AddButtonProps) => {
  return (
    <div className="flex justify-between items-center w-full">
      <span className="truncate">{label}</span>
      <Button
        size="icon"
        variant="ghost"
        className="h-6 w-6 hover:bg-accent shrink-0 ml-1"
        onClick={() => setAddingTo({type: "lyric", parentId: null})}>
        <Plus className="h-4 w-4"/>
      </Button>
    </div>
  )
}

export default AddButton;