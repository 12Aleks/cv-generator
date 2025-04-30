'use client';

import { useEffect, useState } from 'react';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { useFormContext, useWatch } from 'react-hook-form';
import { FormData } from '@/types/types';
import { addImageToPdf, processImageToCircle } from '@/app/lib/implementImage';

export default function PdfPreview() {
    const { control } = useFormContext<FormData>();
    const formData = useWatch({ control });
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);

    useEffect(() => {
        let currentUrl: string | null = null;

        const generatePdf = async () => {
            try {
                const pdfDoc = await PDFDocument.create();
                const page = pdfDoc.addPage([595.28, 841.89]); // A4 size

                const { width, height } = page.getSize();
                const fontSize = 12;
                const leftColumnWidth = 200;

                // 1. Проверяем, есть ли изображение
                let imageOffset = -100;
                let imageUrl: string | null = null;

                if (formData.image instanceof File) {
                    const file = formData.image;
                    if (['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
                        imageUrl = await processImageToCircle(file);
                        if(imageUrl) imageOffset = -60;
                    }
                }

                // 2. Рисуем фон
                page.drawRectangle({
                    x: 0,
                    y: 0,
                    width: leftColumnWidth,
                    height,
                    color: rgb(0.9, 0.9, 0.9),
                });

                // 3. Эллипс — с учетом imageOffset
                page.drawEllipse({
                    x: leftColumnWidth / 2,
                    y: height - imageOffset,
                    xScale: 200,
                    yScale: 200,
                    color: rgb(0.1, 0.45, 0.75),
                });

                // 4. Картинка — поверх
                if (imageUrl) {
                    await addImageToPdf(pdfDoc, {
                        imageUrl,
                        x: leftColumnWidth / 2 - 60,
                        y: height - 180,
                        width: 120,
                        height: 120,
                    });
                }

                // 5. Белый прямоугольник перекрытия справа
                page.drawRectangle({
                    x: leftColumnWidth,
                    y: height - 200,
                    width: width - leftColumnWidth,
                    height: 200,
                    color: rgb(1, 1, 1),
                });

                // 6. Текст
                let leftY = height - 50;
                let rightY = height - 50;
                const lineGap = 20;

                const addLeftText = (label: string, value?: string | null) => {
                    if (!value) return;
                    page.drawText(`${label}: ${value}`, {
                        x: 20,
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

                // Имя
                const fullName = `${formData.firstName || ''} ${formData.lastName || ''}`.trim();
                if (fullName) {
                    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
                    const textWidth = font.widthOfTextAtSize(fullName, 20);
                    const x = (leftColumnWidth - textWidth) / 2;
                    page.drawText(fullName, {
                        x,
                        y: leftY,
                        size: 20,
                        font,
                        color: rgb(1, 1, 1),
                        maxWidth: leftColumnWidth - 40,
                    });
                    leftY -= lineGap;
                }

                // Остальные поля
                addLeftText('Email', formData.email);
                addLeftText('Phone', formData.phone);
                addLeftText('Citizenship', formData.citizenship);
                addLeftText('Birth Date', formData.birthDate);
                addLeftText('Gender', formData.gender);
                addLeftText('LinkedIn', formData.linkedin);
                addRightText('Profile', formData.profile);

                // Сохраняем и отображаем PDF
                const pdfBytes = await pdfDoc.save();
                const blob = new Blob([pdfBytes], { type: 'application/pdf' });

                if (currentUrl) {
                    URL.revokeObjectURL(currentUrl);
                }

                currentUrl = URL.createObjectURL(blob);
                setPdfUrl(currentUrl);
            } catch (error) {
                console.error('Error generating PDF:', error);
            }
        };

        generatePdf();

        return () => {
            if (currentUrl) {
                URL.revokeObjectURL(currentUrl);
            }
        };
    }, [formData]);

    return (
        <div className="overflow-hidden bg-white rounded shadow border border-black-50 aspect-[1/1.4142]">
            {pdfUrl ? (
                <iframe
                    src={`${pdfUrl}#toolbar=0&navpanes=0&view=FitH`}
                    style={{ backgroundColor: 'white' }}
                    width="100%"
                    height="100%"
                />
            ) : (
                <p>Generating PDF...</p>
            )}
        </div>
    );
}
