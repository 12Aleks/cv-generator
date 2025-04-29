import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormData } from '@/types/types';

export default function PhotoUploader() {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const { setValue, watch, formState: { errors } } = useFormContext<FormData>();

    const image = watch('image');

    const { getRootProps, getInputProps } = useDropzone({
        accept: { 'image/*': [] },
        maxFiles: 1,
        onDrop: (acceptedFiles: File[]) => {
            const file = acceptedFiles[0];
            if (file) {
                const objectUrl = URL.createObjectURL(file);

                if (previewUrl) {
                    URL.revokeObjectURL(previewUrl);
                }

                setValue('image', file ?? undefined);
                setPreviewUrl(objectUrl);
            }
        },
    });

    useEffect(() => {
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    return (
        <div className="flex flex-col items-center">
            <div
                {...getRootProps()}
                className="w-32 h-32 border border-gray-300 bg-gray-50 rounded overflow-hidden cursor-pointer flex items-center justify-center"
            >
                <input {...getInputProps()} />
                {previewUrl ? (
                    <Image
                        src={previewUrl}
                        alt="Uploaded"
                        width={128}
                        height={128}
                        className="object-cover"
                    />
                ) : (
                    <p className="p-4 text-sm text-gray-500 text-center">
                        Kliknij, by dodać zdjęcie
                    </p>
                )}
            </div>
            {errors.image && (
                <p className="text-red-500 text-sm mt-2">{errors.image.message}</p>
            )}
        </div>
    );
}
