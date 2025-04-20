'use client';

import { useState, ReactNode, useRef, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { ChevronDown, SquarePen } from 'lucide-react';
import { Tooltip } from 'react-tooltip';
import clsx from 'clsx';
import {FormData, TitleFieldsOnly} from '@/types/types';

interface Props {
    titleName: TitleFieldsOnly;
    defaultTitle: string;
    children: ReactNode;
}

export default function AccordionItem({ titleName, defaultTitle, children }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    const { register, setValue, watch } = useFormContext<FormData>();
    const editableTitle = watch(titleName) ?? defaultTitle;

    const handleEditClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsEditing(true);
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.stopPropagation();
        setValue(titleName, e.target.value);
    };

    const handleTitleBlur = () => {
        setIsEditing(false);
    };

    useEffect(() => {
        if (isOpen) handleTitleBlur();
    }, [isOpen]);

    return (
        <div className="overflow-hidden z-20 relative">
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(!isOpen);
                }}
                className="w-full text-left px-4 py-2 font-medium flex items-center justify-between"
            >
                {isEditing && editableTitle ? (
                    <div>
                        <input
                            type="text"
                            value={editableTitle}
                            onChange={handleTitleChange}
                            onClick={(e) => e.stopPropagation()}
                            onBlur={handleTitleBlur}
                            className="text-gray-500 text-lg focus:outline-none"
                        />
                        <hr className="border-t border-gray-400" />
                    </div>
                ) : (
                    <span className="text-lg text-gray-800">{editableTitle}</span>
                )}

                <div className="flex gap-3 relative">
                    {isOpen && (
                        <>
                            <Tooltip id={"tooltip-edit" + titleName} place="left"/>
                            <div
                                className="border border-gray-300 rounded-md text-sm font-medium text-gray-900 py-2 px-1.5"
                                onClick={handleEditClick}
                                data-tooltip-id={"tooltip-edit" + titleName}
                                data-tooltip-content="Edytuj tytuł"
                            >
                                <SquarePen className="w-5 h-6 cursor-pointer" />
                            </div>
                        </>
                    )}
                    <Tooltip id={"tooltip-edit-1" + titleName} place={isOpen ? "bottom-start" : "left" } />
                    <div
                        className="border border-gray-300 rounded-md text-sm font-medium text-gray-900 py-2 px-1.5 relative"
                        data-tooltip-id={"tooltip-edit-1" + titleName}
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
