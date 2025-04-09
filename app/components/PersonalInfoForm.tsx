'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import AccordionItem from './AccordionItem';
import {personalInfoSchema} from "@/app/lib/zoodSchema";
import PhotoUploader from "@/app/components/PhotoUploader";
import {useState} from "react";
import {EllipsisVertical, Plus} from "lucide-react";

const optionalFields = [
    { name: 'citizenship', label: 'Obywatelstwo' },
    { name: 'site', label: 'Strona internetowa' },
    { name: 'birthDate', label: 'Data urodzenia' },
    { name: 'birthPlace', label: 'Miejsce urodzenia' },
    { name: 'driversLicense', label: 'Prawo jazdy' },
    { name: 'gender', label: 'Płeć' },
    { name: 'maritalStatus', label: 'Stan cywilny' },
    { name: 'linkedin', label: 'LinkedIn' },
    { name: 'customField', label: 'Pole niestandardowe' },
];

type FormData = z.infer<typeof personalInfoSchema>;

export default function PersonalInfoForm() {
    const [activeFields, setActiveFields] = useState<string[]>(['citizenship', 'site']);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(personalInfoSchema),
    });

    const onSubmit = (data: FormData) => {
        console.log(data);
    };

    const handleAddField = (name: string) => {
        setActiveFields((prev) => [...prev, name]);
    };

    const handleRemoveField = (name: string) => {
        setActiveFields((prev) => prev.filter((field) => field !== name));
    };

    return (
        <AccordionItem title="Dane osobowe">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="flex gap-4">
                    <div>
                    <label className="text-sm text-neutral-700 tracking-wide">Zdjęcie</label>
                    <PhotoUploader />
                    </div>
                    <div className="flex-1 grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm text-neutral-700 tracking-wide">Imię</label>
                            <input {...register('firstName')} className="w-full p-2 rounded bg-gray-50 border border-gray-300" />
                            {errors.firstName && <p className="text-red-500">{errors.firstName.message}</p>}
                        </div>
                        <div>
                            <label className="text-sm text-neutral-700 tracking-wide">Nazwisko</label>
                            <input {...register('lastName')} className="w-full p-2 rounded bg-gray-50 border border-gray-300" />
                            {errors.lastName && <p className="text-red-500">{errors.lastName.message}</p>}
                        </div>
                        <div className="col-span-2">
                            <label className="text-sm text-neutral-700 tracking-wide">Nagłówek</label>
                            <input {...register('title')} className="w-full p-2 rounded bg-gray-50 border border-gray-300" />
                            {errors.title && <p className="text-red-500">{errors.title.message}</p>}
                        </div>
                    </div>

                </div>

                <div>
                    <label className="text-sm text-neutral-700 tracking-wide">Email</label>
                    <input {...register('email')} className="w-full bg-gray-50 border border-gray-300 p-2 rounded" />
                    {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                </div>

                <div>
                    <label className="text-sm text-neutral-700 tracking-wide">Telefon</label>
                    <input {...register('phone')} className="w-full bg-gray-50 border border-gray-300 p-2 rounded" />
                </div>

                {activeFields.map((fieldName) => {
                    const label = optionalFields.find((f) => f.name === fieldName)?.label;
                    return (
                        <div key={fieldName} className="relative">
                            <label className="text-sm text-neutral-700 tracking-wide">{label}</label>
                            <input {...register(fieldName as keyof FormData)} className="w-full bg-gray-50 border border-gray-300 p-2 rounded" />
                            <button
                                type="button"
                                onClick={() => handleRemoveField(fieldName)}
                                className="absolute right-2 top-1 text-sm text-red-500"
                            >
                                <EllipsisVertical  className="w-4 h-4 cursor-pointer" />
                            </button>
                            <div className="absolute right-6 top-0 hidden group-hover:block bg-black text-white text-xs px-2 py-1 rounded z-10">
                                Usuń pole
                            </div>
                        </div>
                    );
                })}

                <div className="flex flex-wrap gap-2">
                    {optionalFields
                        .filter((f) => !activeFields.includes(f.name))
                        .map((f) => (
                            <button
                                key={f.name}
                                type="button"
                                onClick={() => handleAddField(f.name)}
                                className="border border-gray-400 px-2 py-1 rounded text-sm cursor-pointer flex items-center justify-between text-neutral-700 tracking-wide"
                            >
                                <Plus className="w-4 h-4 text-neutral-500 me-1"/> {f.label}
                            </button>
                        ))}
                </div>

                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                    Zapisz
                </button>
            </form>
        </AccordionItem>
    );
}
