'use client';

import {useEffect, useState} from 'react';
import {PDFDocument, rgb, StandardFonts} from 'pdf-lib';
import {useFormContext, useWatch} from 'react-hook-form';
import {FormData, PersonalData} from '@/types/types';
import {addImageToPdf, processImageToCircle} from '@/app/lib/implementImage';
import {drawCenteredTextGroup, drawCenteredTextOnPage} from "@/app/lib/pdfUtils";

export default function PdfPreview() {
    const {control} = useFormContext<FormData>();
    const formData = useWatch({control});
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);

    useEffect(() => {
        let currentUrl: string | null = null;

        const generatePdf = async () => {
            try {
                const pdfDoc = await PDFDocument.create();
                const page = pdfDoc.addPage([595.28, 841.89]); // A4 size

                const {width, height} = page.getSize();
                const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
                const leftColumnWidth = 200;

                // Fields
                const fullName: string = `${formData.firstName || ''} ${formData.lastName || ''}`.trim();
                const email: string = `${formData.email}`.trim();
                const phone: string = `${formData.phone}`.trim();
                const citizenship: string = `${formData.citizenship}`.trim();
                const birthDate: string = `${formData.birthDate}`.trim();
                const gender: string = `${formData.gender}`.trim();
                const linkedin: string = `${formData.linkedin}`.trim();
                const profile: string = `${formData.profile}`.trim();

                // 1. Проверяем, есть ли изображение
                let topOffset = -100;
                let imageUrl: string | null = null;

                if (formData.image instanceof File) {
                    const file = formData.image;
                    if (['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
                        imageUrl = await processImageToCircle(file);
                        if (imageUrl) topOffset = -60;
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
                    y: height - topOffset,
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

                if (fullName) {
                    drawCenteredTextOnPage({
                        page,
                        text: fullName,
                        font,
                        fontSize: 20,
                        y: leftY,
                        containerWidth: leftColumnWidth,
                    });
                    leftY -= lineGap;
                }

                const personalData: PersonalData[] = [];


                email && personalData.push({
                    text: email,
                    fontSize: 14,
                    color: rgb(0, 0, 0),
                });


                phone && personalData.push({
                    text: phone,
                    fontSize: 14,
                    color: rgb(0, 0, 0),
                });


                if (personalData.length > 0) {
                    const top = topOffset + (topOffset === -60? -150 : -30)
                    console.log(topOffset, height)
                    drawCenteredTextGroup({
                        page,
                        personalData,
                        font,
                        startX: 30,
                        startY: height + top,
                        containerWidth: leftColumnWidth,
                        lineGap,
                    });

                    // обновляем leftY после всей группы
                    leftY -= lineGap * personalData.length;
                }

                // Сохраняем и отображаем PDF
                const pdfBytes = await pdfDoc.save();
                const blob = new Blob([pdfBytes], {type: 'application/pdf'});

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
                    style={{backgroundColor: 'white'}}
                    width="100%"
                    height="100%"
                />
            ) : (
                <p>Generating PDF...</p>
            )}
        </div>
    );
}
