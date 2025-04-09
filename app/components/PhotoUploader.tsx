import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { useState } from 'react';

export default function PhotoUploader() {
    const [file, setFile] = useState<File | null>(null);

    const { getRootProps, getInputProps } = useDropzone({
        accept: { 'image/*': [] },
        maxFiles: 1,
        onDrop: (acceptedFiles) => {
            setFile(acceptedFiles[0]);
        },
    });

    return (
        <div {...getRootProps()} className="w-32 h-32 border border-gray-300 rounded overflow-hidden cursor-pointer flex items-center justify-center">
            <input {...getInputProps()} />
            {file ? (
                <Image
                    src={URL.createObjectURL(file)}
                    alt="Uploaded"
                    width={128}
                    height={128}
                    className="object-cover"
                />
            ) : (
                <p className="p-4 text-sm text-gray-500 text-center">Kliknij, by dodać zdjęcie</p>
            )}
        </div>

    );
}
