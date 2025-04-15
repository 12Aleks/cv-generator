'use client';
import {ReactNode, useState} from 'react';
import {
    DndContext,
    closestCenter,
    DragEndEvent,
    DragOverlay,
    useSensor,
    useSensors,
    PointerSensor,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import SortableItem from "@/app/components/SortableItem";

type FormItem = {
    id: string;
    element: ReactNode;
};

export default function SortableFormWrapper({items}: { items: FormItem[] }) {
    const [formItems, setFormItems] = useState(items);
    const [activeId, setActiveId] = useState<string | null>(null);

    const sensors = useSensors(useSensor(PointerSensor));

    const handleDragEnd = (event: DragEndEvent) => {
        const {active, over} = event;

        if (active.id !== over?.id) {
            const oldIndex = formItems.findIndex((item) => item.id === active.id);
            const newIndex = formItems.findIndex((item) => item.id === over?.id);
            setFormItems(arrayMove(formItems, oldIndex, newIndex));
        }

        setActiveId(null);
    };

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            onDragStart={(event) => setActiveId(event.active.id as string)}
        >
            <SortableContext
                items={formItems.map((item) => item.id)}
                strategy={verticalListSortingStrategy}
            >
                {formItems.map((item) => (
                    <SortableItem key={item.id} id={item.id}>
                        {item.element}
                    </SortableItem>
                ))}
            </SortableContext>

            <DragOverlay>
                {activeId ? (
                    <div className="p-4 bg-white border shadow-lg rounded-md">
                        {
                            formItems.find(item => item.id === activeId)?.element
                        }
                    </div>
                ) : null}
            </DragOverlay>
        </DndContext>
    );
}
