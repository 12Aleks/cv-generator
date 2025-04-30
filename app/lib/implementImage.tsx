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

    let image;
    if (imageUrl.startsWith('data:image/png')) {
        image = await pdfDoc.embedPng(imageBytes);
    } else if (imageUrl.startsWith('data:image/jpeg') || imageUrl.startsWith('data:image/jpg')) {
        image = await pdfDoc.embedJpg(imageBytes);
    } else {
        throw new Error('Unsupported image format');
    }

    const page = pdfDoc.getPages()[0];

    page.drawImage(image, {
        x,
        y,
        width,
        height,
    });
}

export async function processImageToCircle(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
            const img = new Image();
            img.onload = () => {
                const size = Math.min(img.width, img.height);
                const canvas = document.createElement('canvas');
                canvas.width = size;
                canvas.height = size;

                const ctx = canvas.getContext('2d');
                if (!ctx) return reject('Canvas context error');

                ctx.beginPath();
                ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2, true);
                ctx.closePath();
                ctx.clip();

                const sx = (img.width - size) / 2;
                const sy = (img.height - size) / 2;
                ctx.drawImage(img, sx, sy, size, size, 0, 0, size, size);

                const circularImageUrl = canvas.toDataURL('image/png');
                resolve(circularImageUrl);
            };
            img.onerror = reject;
            img.src = reader.result as string;
        };

        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}
