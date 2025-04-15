'use client';

import { useState, ReactNode, useRef } from 'react';
import { ChevronDown } from "lucide-react";
import clsx from "clsx";

interface Props {
    title: string;
    children: ReactNode;
}

export default function AccordionItem({ title, children }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    return (
        <div className="border rounded-lg border-solid border-gray-200 dark:border-gray-300 overflow-hidden z-50 relative">
            <button
                onClick={(e) => {
                    e.stopPropagation()
                    setIsOpen(!isOpen)}}
                className="w-full text-left px-4 py-2 bg-gray-50 hover:bg-gray-100 font-medium flex items-center justify-between"
            >
                {title}
                <ChevronDown
                    className={clsx(
                        "h-5 w-5 transform transition-transform duration-300",
                        isOpen ? "rotate-180" : "rotate-0"
                    )}
                />
            </button>
            <div
                ref={contentRef}
                className="grid transition-all duration-500 ease-in-out"

            >
                {isOpen && <div className="overflow-hidden p-4">{children}</div>}
            </div>
        </div>
    );
}
