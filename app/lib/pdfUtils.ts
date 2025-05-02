import {PDFPage, PDFFont, rgb, RGB} from 'pdf-lib';
import {PersonalData} from "@/types/types";

interface IDrawCenteredTextOptions {
    page: PDFPage;
    text: string;
    font: PDFFont;
    fontSize: number;
    x?: number;
    y: number;
    containerWidth?: number;
    color?: RGB;
    xOffset?: number;
    maxWidth?: number;
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

export function drawCenteredTextOnPage({   page, text, font, fontSize, y, x = 0,
                                           containerWidth = 0,
                                           color = rgb(1, 1, 1), xOffset = 0,
                                           maxWidth = containerWidth
                                       }: IDrawCenteredTextOptions) {
    const textWidth: number = font.widthOfTextAtSize(text, fontSize);
    const xCenter: number = x? x :  xOffset + (containerWidth - textWidth) / 2;
    page.drawText(text, {
        x : xCenter,
        y,
        size: fontSize,
        font,
        color,
        maxWidth,
    });
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
        const { text, fontSize, color = rgb(1, 1, 1) } = data;

        const textWidth = font.widthOfTextAtSize(text, fontSize);
        const x = startX? startX: (containerWidth - textWidth) / 2;

        page.drawText(text, {
            x,
            y: currentY,
            size: fontSize,
            font,
            color,
            maxWidth: containerWidth - 40,
        });

        currentY -= lineGap;
    }
}
