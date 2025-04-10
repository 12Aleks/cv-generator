'use client';
import { useFormContext } from 'react-hook-form';
import { useState } from 'react';
import AccordionItem from '@/app/components/AccordionItem';
import SortableLanguageItem from './SortableLanguageItem';
import { Language } from '@/types/types';

import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    SortableContext,
    verticalListSortingStrategy,
    arrayMove,
} from '@dnd-kit/sortable';
import { restrictToVerticalAxis, restrictToParentElement } from '@dnd-kit/modifiers';

export default function LanguagesForm() {
    const { register } = useFormContext();
    const [languages, setLanguages] = useState<Language[]>([]);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: { distance: 5 },
        })
    );

    const addLanguage = () => {
        setLanguages((prev) => [
            ...prev,
            { id: crypto.randomUUID(), name: '', level: 'A1', language: 'Unknown' },
        ]);
    };

    const updateLang = (index: number, updated: Partial<Language>) => {
        setLanguages((prev) => {
            const copy = [...prev];
            copy[index] = { ...copy[index], ...updated };
            return copy;
        });
    };

    const removeLang = (id: string) => {
        setLanguages((prev) => prev.filter((l) => l.id !== id));
    };

    const handleDragEnd = (event: any) => {
        const { active, over } = event;
        if (active.id !== over?.id) {
            const oldIndex = languages.findIndex((l) => l.id === active.id);
            const newIndex = languages.findIndex((l) => l.id === over.id);
            setLanguages((langs) => arrayMove(langs, oldIndex, newIndex));
        }
    };

    return (
        <AccordionItem title="Języki">
            <div className="space-y-3">
                <h3 className="text-lg font-semibold">Języki</h3>
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                    modifiers={[restrictToVerticalAxis, restrictToParentElement]}
                >
                    <SortableContext
                        items={languages.map((l) => l.id)}
                        strategy={verticalListSortingStrategy}
                    >
                        {languages.map((lang, index) => (
                            <SortableLanguageItem
                                key={lang.id}
                                id={lang.id}
                                index={index}
                                lang={lang}
                                updateLang={updateLang}
                                removeLang={removeLang}
                            />
                        ))}
                    </SortableContext>
                </DndContext>

                <button
                    type="button"
                    onClick={addLanguage}
                    className="mt-2 px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm cursor-pointer"
                >
                    + Dodaj język
                </button>
            </div>
        </AccordionItem>
    );
}
