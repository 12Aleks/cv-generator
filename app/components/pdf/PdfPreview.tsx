'use client';
import {useEffect, useRef, useState} from 'react';
import {useFormContext, useWatch} from 'react-hook-form';
import {FormData} from '@/types/types';
import {generatePdfDocument} from '@/app/lib/pdfGenerator';
import {createPdfUrl} from '@/app/lib/createPdfUrl';

export default function PdfPreview() {
    const {control} = useFormContext<FormData>();
    const formData = useWatch({control});
    const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

    const [pdfUrl, setPdfUrl] = useState<string | null>(null);
    const [prevPdfUrl, setPrevPdfUrl] = useState<string | null>(null);
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        let currentUrl: string | null = null;

        debounceTimeout.current && clearTimeout(debounceTimeout.current);

        debounceTimeout.current = setTimeout(() => {
            const generate = async () => {
                try {
                    const pdfBytes = await generatePdfDocument(formData);

                    if (currentUrl) URL.revokeObjectURL(currentUrl);
                    currentUrl = createPdfUrl(pdfBytes);

                    setPrevPdfUrl(pdfUrl);
                    setPdfUrl(currentUrl);
                    setIsUpdating(true);

                    setTimeout(() => {
                        if (prevPdfUrl) URL.revokeObjectURL(prevPdfUrl);

                        setPrevPdfUrl(null);
                        setIsUpdating(false);
                    }, 300);
                } catch (error) {
                    console.error('Error generating PDF:', error);
                }
            };

            generate();
        }, 1000);

        return () => {
            if (debounceTimeout.current) {
                clearTimeout(debounceTimeout.current);
            }
            if (currentUrl) {
                URL.revokeObjectURL(currentUrl);
            }
        };
    }, [formData]);

    return (
        <div className="relative overflow-hidden bg-white rounded shadow border border-black-50 aspect-[1/1.4142]">
            {prevPdfUrl && (
                <iframe
                    src={`${prevPdfUrl}#toolbar=0&navpanes=0&view=FitH`}
                    className={`absolute inset-0 w-full h-full transition-opacity duration-300 ${isUpdating ? 'opacity-100' : 'opacity-0'}`}
                />
            )}
            {pdfUrl && (
                <iframe
                    src={`${pdfUrl}#toolbar=0&navpanes=0&view=FitH`}
                    className={`absolute inset-0 w-full h-full transition-opacity duration-300 ${isUpdating ? 'opacity-0' : 'opacity-100'}`}
                />
            )}
            {!pdfUrl && (
                <p className="absolute inset-0 flex items-center justify-center text-lg 2xl:text-xl text-stone-700">
                    Generating PDF...
                </p>
            )}
        </div>
    );
}

