import {PDFPage, PDFFont, rgb, RGB, PDFDocument} from 'pdf-lib';
import {PersonalData} from "@/types/types";

interface IDrawCenteredTextOptions {
    page: PDFPage;
    text: string | string[];
    font: PDFFont;
    fontSize: number;
    startX?: number;
    startY: number;
    containerWidth?: number;
    color?: RGB;
    xOffset?: number;
    maxWidth?: number;
    underline?: boolean
}

interface IDrawCenteredTextGroupOptions {
    page: PDFPage;
    personalData: PersonalData[];
    font: PDFFont;
    startX?: number;
    startY: number;
    containerWidth: number;
    lineGap: number;
}

interface ISplitTextIntoLines{
    text: string,
    font: PDFFont,
    fontSize: number,
    maxWidth: number
}

export function splitTextIntoLines(props: ISplitTextIntoLines): string[] {
    const {text, font, fontSize, maxWidth} = props
    const words = text.split(' ');
    const lines: string[] = [];
    let currentLine = '';

    for (const word of words) {
        const testLine = currentLine ? `${currentLine} ${word}` : word;
        const testWidth = font.widthOfTextAtSize(testLine, fontSize);

        if (testWidth <= maxWidth) {
            currentLine = testLine;
        } else {
            if (currentLine) lines.push(currentLine);
            currentLine = word;
        }
    }

    currentLine && lines.push(currentLine);

    return lines;
}

export function drawCenteredTextOnPage(data: IDrawCenteredTextOptions) {
    const {
        page, text, font, fontSize, startY, startX = 0, containerWidth = 0,
        color = rgb(1, 1, 1), xOffset = 0,
        maxWidth = containerWidth, underline = false
    } = data;

    const textString = Array.isArray(text) ? text.join(' ') : text;
    const textWidth: number = font.widthOfTextAtSize(textString, fontSize);
    const xCenter: number = startX ? startX : xOffset + (containerWidth - textWidth) / 2;
    let currentY = startY;

    page.drawText(textString, {
        x: xCenter,
        y: currentY,
        size: fontSize,
        font,
        color,
        maxWidth,
    });

    underline && underLine({font, text: textString, fontSize, page}, currentY);
}

export function drawCenteredTextGroup({
                                          page,
                                          personalData,
                                          font,
                                          startX,
                                          startY,
                                          containerWidth,
                                          lineGap,
                                      }: IDrawCenteredTextGroupOptions) {
    let currentY = startY;

    for (const data of personalData) {
        const {text, fontSize, color = rgb(0, 0, 0), icon, underline, top = 0} = data;

        const iconSize = fontSize + 2;
        const iconMargin = 5;

        let textX = startX || 0;

        if (icon) {
            page.drawImage(icon, {
                x: textX,
                y: currentY - iconSize * 0.25,
                width: iconSize,
                height: iconSize,
            });
            textX += iconSize + iconMargin;
        }

        page.drawText(text, {
            x: textX,
            y: currentY,
            size: fontSize,
            font,
            color,
        });

        underline && underLine({font, text, fontSize, page}, currentY)
        currentY -= lineGap;
    }
}

function underLine({font, text, fontSize, page}: Pick<IDrawCenteredTextOptions, "font" | "text" | "fontSize" | "page">,
                   currentY: number) {
    const textString = Array.isArray(text) ? text.join(' ') : text;
    const textWidth = font.widthOfTextAtSize(textString, fontSize);
    const underlineY = currentY - 2;

    page.drawLine({
        start: {x: 10, y: underlineY - 3},
        end: {x: 70 + textWidth, y: underlineY - 3},
        thickness: .5,
        color: rgb(0.7, 0.7, 0.7),
    });
}


export async function getIcon(path: string, pdfDoc: PDFDocument) {
    const iconBytes = await fetch(path).then(res => res.arrayBuffer());
    const icon = await pdfDoc.embedPng(iconBytes);
    return icon
}
