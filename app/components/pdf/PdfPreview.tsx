'use client'
import { useEffect, useState } from 'react';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { useFormContext, useWatch } from 'react-hook-form';
import { FormData } from '@/types/types';
import {addImageToPdf} from "@/app/lib/implementImage";

export default function PdfPreview() {
    const { control } = useFormContext<FormData>();
    const formData = useWatch({ control }); // Reactively watches the whole form
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);

    useEffect(() => {
        const generatePdf = async () => {
            const pdfDoc = await PDFDocument.create();
            const page = pdfDoc.addPage([595.28, 841.89]); // A4 size

            const { width, height } = page.getSize();
            const fontSize = 12;



            // 2. Draw left column background (e.g., 200px wide)
            const leftColumnWidth = 200;
            page.drawRectangle({
                x: 0,
                y: 0,
                width: leftColumnWidth,
                height,
                color: rgb(0.9, 0.9, 0.9),
            });

           // Draw half-circle at the top
            page.drawEllipse({
                x: leftColumnWidth / 2,
                y: height - -110,
                xScale: 200,
                yScale: 200,
                color: rgb(0.1, 0.45, .75),
            });

            page.drawRectangle({
                x: leftColumnWidth,
                y: height - 200,  // height where ellipse is
                width: width - leftColumnWidth,
                height: 200,      // enough to cover ellipse
                color: rgb(1, 1, 1), // white (same as page background)
            });

            // 3. Text positioning
            let leftY = height - 50;
            let rightY = height - 50;
            const lineGap = 20;

            const addLeftText = (label: string, value?: string | null) => {
                if (!value) return;
                page.drawText(`${label}: ${value}`, {
                    x: 20,  // inside left column
                    y: leftY,
                    size: fontSize,
                    color: rgb(0, 0, 0),
                    maxWidth: leftColumnWidth - 40,
                });
                leftY -= lineGap;
            };

            const addRightText = (label: string, value?: string | null) => {
                if (!value) return;
                page.drawText(`${label}: ${value}`, {
                    x: leftColumnWidth + 20,
                    y: rightY,
                    size: fontSize,
                    color: rgb(0, 0, 0),
                });
                rightY -= lineGap;
            };

            if (formData.image instanceof File) {
                const file = formData.image;

                // Проверка типа изображения
                if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
                    console.error('Unsupported image format');
                    return;
                }

                const imageUrl = await new Promise<string>((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = () => resolve(reader.result as string);
                    reader.onerror = reject;
                    reader.readAsDataURL(file);
                });

                const imageProperties = {
                    imageUrl,
                    x: leftColumnWidth + 20,
                    y: height - 150,
                    width: 100,
                    height: 100,
                };

                await addImageToPdf(pdfDoc, imageProperties);
            }

            // 4. Fill left column (personal info)

            const fullName = `${formData.firstName || ''} ${formData.lastName || ''}`.trim();

            if (fullName) {
                const font = await pdfDoc.embedFont(StandardFonts.Helvetica); // Embed the font
                const textWidth = font.widthOfTextAtSize(fullName, 20);
                const x = (leftColumnWidth - textWidth) / 2;
                page.drawText(fullName, {
                    x,
                    y: leftY,
                    size: 20,
                    font: font,
                    color: rgb(1, 1, 1),
                    maxWidth: leftColumnWidth - 40,
                });
                leftY -= lineGap;
            }
            addLeftText('Email', formData.email);
            addLeftText('Phone', formData.phone);
            addLeftText('Citizenship', formData.citizenship);
            addLeftText('Birth Date', formData.birthDate);
            addLeftText('Gender', formData.gender);
            addLeftText('LinkedIn', formData.linkedin);

            // 5. Fill right column (profile, experience, etc.)
            addRightText('Profile', formData.profile);
            // (You can add more right-column fields here)

            // Save and display
            const pdfBytes = await pdfDoc.save();
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            setPdfUrl(url);
        };


        generatePdf();
    }, [formData]);

    return (
        <div className="overflow-hidden bg-white rounded shadow border border-black-50 aspect-[1/1.4142] ">
            {pdfUrl ? (
                <iframe
                    src={`${pdfUrl}#toolbar=0&navpanes=0&view=FitH`}
                    style={{ backgroundColor: 'white' }}
                    width="100%" height="100%" />
            ) : (
                <p>Generating PDF...</p>
            )}
        </div>
    );
}
