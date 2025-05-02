'use client';
import {memo} from 'react'
import { Trash2, GripVertical } from 'lucide-react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Language } from '@/types/types';

type IProps = {
    id: string;
    index: number;
    lang: Language;
    updateLang: (index: number, updated: Partial<Language>) => void;
    removeLang: (id: string) => void;
};

function SortableLanguageItem({ id, index, lang, updateLang, removeLang,}: IProps) {
    const {attributes, listeners, setNodeRef, transform, transition} = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            className="flex items-center gap-2 bg-gray-100 p-2 rounded-md shadow-sm "
        >
            <GripVertical
                {...listeners}
                className="cursor-grab active:cursor-grabbing text-gray-500 w-4 h-4"
            />
            <input
                value={lang.name}
                onChange={(e) => updateLang(index, { name: e.target.value })}
                placeholder="Język"
                className="input bg-gray-50"
            />
            <select
                value={lang.level}
                onChange={(e) => updateLang(index, { level: e.target.value })}
                className="input w-24 bg-gray-50"
            >
                {['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].map((lvl) => (
                    <option key={lvl} value={lvl}>
                        {lvl}
                    </option>
                ))}
            </select>
            <button
                type="button"
                onClick={() => removeLang(lang.id)}
                className="text-red-500 hover:text-red-700 cursor-pointer"
            >
                <Trash2 className="w-4 h-4" />
            </button>
        </div>
    );
}

export default memo(SortableLanguageItem);
