'use client';
import {useState} from "react";
import {v4 as uuidv4} from 'uuid';
import {Hobby} from "@/types/types"
import AccordionItem from "@/app/components/AccordionItem";
import HobbyItem from "@/app/components/HobbyForm/HobbyItem";
import {Plus} from "lucide-react";


const HobbyForm = () => {
    const [hobby, setHobby] = useState<Hobby[]>([{id: uuidv4(), description: ''}]);


    const updateHobby = (index: number, updated: Partial<Hobby>) => {
        setHobby((prev) => {
            const copy = [...prev];
            copy[index] = {...copy[index], ...updated};
            return copy;
        });
    }

    const removeHobby = (id: string) => {
        setHobby((prev) => prev.filter((l) => l.id !== id));
    };

    const addHobby = () => {
        setHobby((prev) => [...prev, {id: uuidv4(), description: ''}]);
    }


    return (
        <AccordionItem titleName="hobbyTitle" defaultTitle="Hobby i zainteresowania">
            <div className="space-y-3">
                {hobby.map((item, index) => (
                    <HobbyItem
                        key={item.id}
                        id={item.id}
                        index={index}
                        hobby={item}
                        updateHobby={updateHobby}
                        removeHobby={removeHobby}
                    />
                ))}
            </div>
            <button
                type="button"
                onClick={addHobby}
                className="mt-2  btn-custom flex items-center justify-between ml-auto"
            >
                <Plus className="w-4 h-4 text-white me-1"/> Dodaj hobby
            </button>
        </AccordionItem>
    );
};

export default HobbyForm;