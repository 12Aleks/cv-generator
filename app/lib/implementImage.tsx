import { PDFDocument } from 'pdf-lib';

interface ImageProperties {
    imageUrl: string;
    x: number;
    y: number;
    width: number;
    height: number;
}
export async function addImageToPdf(
    pdfDoc: PDFDocument,
    { imageUrl, x, y, width, height }: ImageProperties
): Promise<void> {
    const imageBytes = await fetch(imageUrl).then(res => res.arrayBuffer());
    const image = await pdfDoc.embedPng(imageBytes);
    const page = pdfDoc.getPages()[0];


    page.drawImage(image, {
        x: x,
        y: y,
        width: width,
        height: height,
    });
}