'use client'
import { useEffect, useState } from 'react';
import { PDFDocument, rgb } from 'pdf-lib';
import { useFormContext, useWatch } from 'react-hook-form';
import { FormData } from '@/types/types';

export default function PdfPreview() {
    const { control } = useFormContext<FormData>();
    const formData = useWatch({ control }); // Reactively watches the whole form
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);

    useEffect(() => {
        const generatePdf = async () => {
            const pdfDoc = await PDFDocument.create();
            const page = pdfDoc.addPage([595.28, 841.89]);

            const { width, height } = page.getSize();
            const fontSize = 12;

            page.drawText('CV Preview:', {
                x: 50,
                y: height - 50,
                size: 18,
                color: rgb(0, 0, 0.8),
            });

            let currentY: number = height - 80;
            const lineGap = 20;

            const addLine = (label: string, value?: string | null) => {
                if (!value) return;
                page.drawText(`${label}: ${value}`, {
                    x: 50,
                    y: currentY,
                    size: fontSize,
                    color: rgb(0, 0, 0),
                });
                currentY -= lineGap;
            };

            addLine('First Name', formData.firstName);
            addLine('Last Name', formData.lastName);
            addLine('Email', formData.email);
            addLine('Phone', formData.phone);
            addLine('Citizenship', formData.citizenship);
            addLine('Birth Date', formData.birthDate);
            addLine('Gender', formData.gender);
            addLine('LinkedIn', formData.linkedin);
            addLine('Profile', formData.profile);

            const pdfBytes = await pdfDoc.save();
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            setPdfUrl(url);
        };

        generatePdf();
    }, [formData]);

    return (
        <div className="aspect-[1/1.4142] border rounded shadow bg-white p-0.5">
            {pdfUrl ? (
                <iframe src={`${pdfUrl}#toolbar=0&navpanes=0&view=FitH`} width="99%" height="100%" />
            ) : (
                <p>Generating PDF...</p>
            )}
        </div>
    );
}
