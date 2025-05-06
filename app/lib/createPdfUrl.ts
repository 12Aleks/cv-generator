export function createPdfUrl(pdfBytes: Uint8Array): string {
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    return URL.createObjectURL(blob);
}