'use client';
import {useState} from "react";

import {FormData, Hobby} from "@/types/types"
import AccordionItem from "@/app/components/AccordionItem";
import HobbyItem from "@/app/components/HobbyForm/HobbyItem";
import {Plus} from "lucide-react";


const HobbyForm = () => {
    const [hobby, setHobby] = useState<Hobby[]>([{id: crypto.randomUUID(), description: ''}]);


    const updateHobby = (index: number, updated: Partial<Hobby>) => {
        setHobby((prev) => {
            const copy = [...prev];
            copy[index] = { ...copy[index], ...updated };
            return copy;
        });
    }

    const removeHobby = (id: string) => {
        setHobby((prev) => prev.filter((l) => l.id !== id));
    };

    const addHobby = () => {
        setHobby((prev) => [...prev, { id: crypto.randomUUID(), description: '' }]);
    }


    return (
        <AccordionItem title="Hobby i zainteresowania">
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
            <button
                type="button"
                onClick={addHobby}
                className="mt-2 px-3 py-2 btn-custom cursor-pointer flex items-center justify-between"
            >
                <Plus className="w-4 h-4 text-white me-1" /> Dodaj język
            </button>
        </AccordionItem>
    );
};

export default HobbyForm;