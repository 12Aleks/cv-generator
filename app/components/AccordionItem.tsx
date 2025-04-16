'use client';

import {useState, ReactNode, useRef, useEffect} from 'react';
import {ChevronDown, SquarePen} from 'lucide-react';
import {Tooltip} from 'react-tooltip'
import clsx from 'clsx';

interface Props {
    title: string;
    children: ReactNode;
}

export default function AccordionItem({title, children}: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editableTitle, setEditableTitle] = useState(title);
    const contentRef = useRef<HTMLDivElement>(null);

    const handleEditClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsEditing(true);
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.stopPropagation();
        setEditableTitle(e.target.value);
    };

    const handleTitleBlur = () => {
        setIsEditing(false);
    };

    useEffect(() => {
        isOpen && handleTitleBlur()
    }, [isOpen])

    return (
        <div className="overflow-hidden z-20 relative">
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(!isOpen);
                }}
                className="w-full text-left px-4 py-2 font-medium flex items-center justify-between"
            >

                {isEditing ? (
                    <div>
                        <input
                            type="text"
                            value={editableTitle}
                            onChange={handleTitleChange}
                            onClick={(e) => e.stopPropagation()}
                            onBlur={handleTitleBlur}
                            className="text-gray-500 text-lg focus:outline-none"
                        />
                        <hr className="border-t border-gray-400"/>
                    </div>
                ) : (
                    <span className="text-lg text-gray-800">{editableTitle}</span>
                )}


                <div className="flex gap-3">
                    {isOpen && (
                        <>
                            <div
                                className="border border-gray-300 rounded-md text-sm font-medium text-gray-900 py-2 px-1.5 relative z-10"
                                onClick={handleEditClick}
                                data-tooltip-id="tooltip-edit"
                                data-tooltip-content="Edytuj tytuł"
                            >
                                <SquarePen className="w-5 h-6 cursor-pointer"/>
                            </div>
                            <Tooltip id="tooltip-edit" place="top"/>
                        </>

                    )}
                    <Tooltip id="tooltip-edit-1" place="top"/>
                    <div
                        className="border border-gray-300 rounded-md text-sm font-medium text-gray-900 py-2 px-1.5"
                        data-tooltip-id="tooltip-edit-1"
                        data-tooltip-content={isOpen ? 'Zwiń sekcję' : 'Rozwiń sekcję'}
                    >
                        <ChevronDown
                            className={clsx(
                                'h-5 w-5 transform transition-transform duration-300 cursor-pointer',
                                isOpen ? 'rotate-180' : 'rotate-0'
                            )}

                        />
                    </div>
                </div>
            </button>

            <div ref={contentRef} className="grid transition-all duration-500 ease-in-out">
                {isOpen && <div className="overflow-hidden p-4">{children}</div>}
            </div>
        </div>
    );
}
