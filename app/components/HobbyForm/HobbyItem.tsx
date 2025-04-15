import {memo} from 'react';
import {Trash2} from "lucide-react";
import {Hobby} from "@/types/types";

interface IProps{
    id: string;
    index: number
    hobby: Hobby;
    updateHobby: (index: number, updated: Partial<Hobby>) => void;
    removeHobby: (id: string) => void;
}

const HobbyItem = ({id, index, hobby,updateHobby, removeHobby}: IProps) => {
    return (
        <div className="flex items-center gap-2 bg-gray-100 p-2 rounded-md shadow-sm">
            <input
                value={hobby.description}
                onChange={(e) => updateHobby(index, { description: e.target.value })}
                className="input bg-gray-50"
            />
            <button
                type="button"
                onClick={() => removeHobby(hobby.id)}
                className="text-red-500 hover:text-red-700 cursor-pointer"
            >
                <Trash2 className="w-4 h-4" />
            </button>
        </div>
    );
};

export default memo(HobbyItem);