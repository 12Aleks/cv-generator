import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { addImageToPdf, processImageToCircle } from './implementImage';
import { drawCenteredTextGroup, drawCenteredTextOnPage, getIcon, splitTextIntoLines } from './pdfUtils';
import { FormData, PersonalData } from '@/types/types';

export async function generatePdfDocument(formData: FormData): Promise<Uint8Array> {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595.28, 841.89]); //Format A4

    const { width, height } = page.getSize();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const leftColumnWidth = 200;

    //text colors
    const ellipseColor = rgb(0.1, 0.45, 0.75);
    const mainTextColor = rgb(0.2, 0.2, 0.3);

    const getString = (val: any) => (typeof val === 'string' ? val.trim() : '');

    const fullName = `${getString(formData.firstName)} ${getString(formData.lastName)}`.trim();
    const email = getString(formData.email);
    const phone = getString(formData.phone);
    const citizenship = getString(formData.citizenship);
    const site = getString(formData.site);
    const birthDate = getString(formData.birthDate);
    const birthPlace = getString(formData.birthPlace);
    const driversLicense = getString(formData.driversLicense);
    const gender = getString(formData.gender);
    const maritalStatus = getString(formData.maritalStatus);
    const linkedin = getString(formData.linkedin);
    const profile = getString(formData.profile);
    const customField = getString(formData.customField);

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

    if (email || phone) {
        drawCenteredTextOnPage({
            page,
            text: 'Dane osobowe',
            font,
            fontSize: 18,
            startX: 10,
            startY: height + top,
            color: mainTextColor,
            containerWidth: leftColumnWidth,
            underline: true,
        });
        leftY -= lineGap;
    }

    const personalData: PersonalData[] = [];

    async function addPersonalField(value: string, iconPath: string) {
        if (value) {
            personalData.push({
                text: value,
                fontSize: 12,
                color: mainTextColor,
                icon: await getIcon(iconPath, pdfDoc),
            });
        }
    }

    await addPersonalField(email, '/icons/mail.png');
    await addPersonalField(phone, '/icons/phone-call.png');
    await addPersonalField(citizenship, '/icons/flag.png');
    await addPersonalField(birthDate, '/icons/calendar-1.png');
    await addPersonalField(birthPlace, '/icons/map-pin-house.png');
    await addPersonalField(driversLicense, '/icons/car-front.png');
    await addPersonalField(gender, '/icons/venus-and-mars.png');
    await addPersonalField(maritalStatus, '/icons/venus-and-mars.png');
    await addPersonalField(site, '/icons/app-window.png');
    await addPersonalField(linkedin, '/icons/linkedin.png');

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

    return await pdfDoc.save();
}
