'use client';

import {useEffect, useState} from 'react';
import {PDFDocument, rgb, StandardFonts} from 'pdf-lib';
import {useFormContext, useWatch} from 'react-hook-form';
import {FormData, PersonalData} from '@/types/types';
import {addImageToPdf, processImageToCircle} from '@/app/lib/implementImage';
import {drawCenteredTextGroup, drawCenteredTextOnPage, getIcon, splitTextIntoLines} from "@/app/lib/pdfUtils";

export default function PdfPreview() {
    const {control} = useFormContext<FormData>();
    const formData = useWatch({control});
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);

    const ellipseColor = rgb(0.1, 0.45, 0.75);
    const mainTextColor = rgb(0.2, 0.2, 0.3);

    useEffect(() => {
        let currentUrl: string | null = null;

        const generatePdf = async () => {
            try {
                const pdfDoc = await PDFDocument.create();
                const page = pdfDoc.addPage([595.28, 841.89]); // A4 size

                const {width, height} = page.getSize();
                const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
                const leftColumnWidth = 200;

                const getString = (val: any) => typeof val === 'string' ? val.trim() : '';
                // Fields
                const fullName = `${getString(formData.firstName)} ${getString(formData.lastName)}`.trim();
                const email: string = `${formData.email}`.trim();
                const phone: string = `${formData.phone}`.trim();
                const citizenship: string = `${formData.citizenship}`.trim();
                const site: string = `${formData.site}`.trim();
                const birthDate: string = `${formData.birthDate}`.trim();
                const birthPlace: string = `${formData.birthPlace}`.trim();
                const driversLicense: string = `${formData.driversLicense}`.trim();
                const gender: string = `${formData.gender}`.trim();
                const maritalStatus: string = `${formData.maritalStatus}`.trim();
                const linkedin: string = `${formData.linkedin}`.trim();
                const profile: string = `${formData.profile}`.trim();
                const customField: string = `${formData.customField}`.trim();

                let topOffset = -100;
                let imageUrl: string | null = null;

                if (formData.image instanceof File) {
                    const file = formData.image;
                    if (['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
                        imageUrl = await processImageToCircle(file);
                        if (imageUrl) topOffset = -60;
                    }
                }

                page.drawRectangle({
                    x: 0,
                    y: 0,
                    width: leftColumnWidth,
                    height,
                    color: rgb(0.9, 0.9, 0.9),
                });

                page.drawEllipse({
                    x: leftColumnWidth / 2,
                    y: height - topOffset,
                    xScale: 200,
                    yScale: 200,
                    color: ellipseColor,
                });

                if (imageUrl) {
                    await addImageToPdf(pdfDoc, {
                        imageUrl,
                        x: leftColumnWidth / 2 - 60,
                        y: height - 180,
                        width: 120,
                        height: 120,
                    });
                }

                page.drawRectangle({
                    x: leftColumnWidth,
                    y: height - 200,
                    width: width - leftColumnWidth,
                    height: 200,
                    color: rgb(1, 1, 1),
                });

                let leftY = height - 50;
                const lineGap = 20;

                // FULL NAME (with line wrapping)
                if (fullName) {
                    const fullNameLines = splitTextIntoLines({
                        text: fullName,
                        font,
                        fontSize: 20,
                        maxWidth: leftColumnWidth - 20,
                    });

                    for (const line of fullNameLines) {
                        drawCenteredTextOnPage({
                            page,
                            text: line,
                            font,
                            fontSize: 20,
                            startY: leftY,
                            containerWidth: leftColumnWidth,
                        });
                        leftY -= lineGap;
                    }
                }

                const top = topOffset + (topOffset === -60 ? -150 : -30);

                (email || phone || citizenship || gender) && drawCenteredTextOnPage({
                    page,
                    text: "Dane osobowe",
                    font,
                    fontSize: 18,
                    startX: 10,
                    startY: height + top,
                    color: mainTextColor,
                    containerWidth: leftColumnWidth,
                    underline: true,
                });
                leftY -= lineGap;

                const personalData: PersonalData[] = [];

                if (email) personalData.push({
                    text: email,
                    fontSize: 12,
                    color: mainTextColor,
                    icon: await getIcon('/icons/mail.png', pdfDoc),
                });

                if (phone) personalData.push({
                    text: phone,
                    fontSize: 12,
                    color: mainTextColor,
                    icon: await getIcon('/icons/phone-call.png', pdfDoc),
                });

                if (citizenship) personalData.push({
                    text: citizenship,
                    fontSize: 12,
                    color: mainTextColor,
                    icon: await getIcon('/icons/flag.png', pdfDoc),
                });

                if (birthDate) personalData.push({
                    text: birthDate,
                    fontSize: 12,
                    color: mainTextColor,
                    icon: await getIcon('/icons/calendar-1.png', pdfDoc),
                });

                if (birthPlace) personalData.push({
                    text: birthPlace,
                    fontSize: 12,
                    color: mainTextColor,
                    icon: await getIcon('/icons/map-pin-house.png', pdfDoc),
                });

                if (driversLicense) personalData.push({
                    text: driversLicense,
                    fontSize: 12,
                    color: mainTextColor,
                    icon: await getIcon('/icons/car-front.png', pdfDoc),
                });

                if (gender) personalData.push({
                    text: gender,
                    fontSize: 12,
                    color: mainTextColor,
                    icon: await getIcon('/icons/venus-and-mars.png', pdfDoc),
                });

                if (maritalStatus) personalData.push({
                    text: maritalStatus,
                    fontSize: 12,
                    color: mainTextColor,
                    icon: await getIcon('/icons/venus-and-mars.png', pdfDoc),
                });

                if (site) personalData.push({
                    text: site,
                    fontSize: 12,
                    color: mainTextColor,
                    icon: await getIcon('/icons/app-window.png', pdfDoc),
                });

                if (linkedin) personalData.push({
                    text: linkedin,
                    fontSize: 12,
                    color: mainTextColor,
                    icon: await getIcon('/icons/linkedin.png', pdfDoc),
                });

                if (profile) {
                    const profileLines = splitTextIntoLines({
                        text: profile,
                        font,
                        fontSize: 12,
                        maxWidth: leftColumnWidth - 20,
                    });

                    for (const line of profileLines) {
                        personalData.push({
                            text: line,
                            fontSize: 12,
                            color: mainTextColor,
                            icon: await getIcon('/icons/mail.png', pdfDoc),
                        });
                    }
                }

                if (customField) {
                    const customFieldLines = splitTextIntoLines({
                        text: customField,
                        font,
                        fontSize: 12,
                        maxWidth: leftColumnWidth - 20,
                    });

                    for (const line of customFieldLines) {
                        personalData.push({
                            text: line,
                            fontSize: 12,
                            color: mainTextColor,
                            icon: await getIcon('/icons/notebook-pen.png', pdfDoc),
                        });
                    }
                }

                if (personalData.length > 0) {
                    drawCenteredTextGroup({
                        page,
                        personalData,
                        font,
                        startX: 10,
                        startY: height + top - 30,
                        containerWidth: leftColumnWidth,
                        lineGap: lineGap + 5,
                    });
                    leftY -= lineGap * personalData.length;
                }

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
        <div className="overflow-hidden bg-white rounded shadow border border-black-50 aspect-[1/1.4142] flex flex-col justify-center items-center">
            {pdfUrl ? (
                <iframe
                    src={`${pdfUrl}#toolbar=0&navpanes=0&view=FitH`}
                    style={{background: 'transparent'}}
                    width="100%"
                    height="100%"
                />
            ) : (
                <p className="text-lg 2xl:text-xl text-stone-700">Generating PDF...</p>
            )}
        </div>
    );
}
