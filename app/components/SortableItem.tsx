import {ReactNode, memo} from "react";
import {useSortable} from "@dnd-kit/sortable";
import {GripVertical} from "lucide-react";
import clsx from "clsx";

const SortableItem = ({id, children}: { id: string; children: ReactNode }) => {
    const {attributes, listeners, setNodeRef, isDragging} = useSortable({id});

    return (
        <div
            ref={setNodeRef}
            className={clsx(
                "flex items-center gap-2 mb-0 border-t-1 border-stone-300 py-3 2xl:py-5 bg-white transition-all duration-300 relative z-0",
                isDragging && "opacity-50 scale-95 shadow-md"
            )}
            {...attributes}
        >
            <GripVertical
                {...listeners}
                className="cursor-grab active:cursor-grabbing text-gray-500 hover:text-gray-800 w-4 h-4 mt-1 trasition-color duration-300"
            />
            <div className="flex-1">
                {children}
            </div>
        </div>
    );
};

export default memo(SortableItem);
