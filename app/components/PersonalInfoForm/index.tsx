'use client';

import {useFormContext} from 'react-hook-form';
import {useState} from 'react';
import {EllipsisVertical, Plus} from 'lucide-react';
import AccordionItem from '../AccordionItem';
import {FormData} from '@/types/types';
import PhotoUploader from './PhotoUploader';

const optionalFields = [
    {name: 'citizenship', label: 'Obywatelstwo'},
    {name: 'site', label: 'Strona internetowa'},
    {name: 'birthDate', label: 'Data urodzenia'},
    {name: 'birthPlace', label: 'Miejsce urodzenia'},
    {name: 'driversLicense', label: 'Prawo jazdy'},
    {name: 'gender', label: 'Płeć'},
    {name: 'maritalStatus', label: 'Stan cywilny'},
    {name: 'linkedin', label: 'LinkedIn'},
    {name: 'customField', label: 'Pole niestandardowe'},
];

export default function Index() {
    const {register, formState: {errors}} = useFormContext<FormData>();
    const [activeFields, setActiveFields] = useState<string[]>(['citizenship', 'site']);

    const handleAddField = (name: string) => {
        setActiveFields((prev) => [...prev, name]);
    };

    const handleRemoveField = (name: string) => {
        setActiveFields((prev) => prev.filter((field) => field !== name));
    };

    return (
        <AccordionItem titleName="personalInfoTitle" defaultTitle="Dane osobowe">
            <div className="flex gap-4 pb-2 2xl:pb-3">
                <PhotoUploader/>
                <div className="flex-1 grid grid-cols-2 gap-4 ">
                    <div>
                        <label className="text-sm text-neutral-700 tracking-wide">Imię</label>
                        <input {...register('firstName')}
                               className="w-full p-2 rounded bg-gray-50 border border-gray-300"/>
                        {errors.firstName && <p className="text-red-500">{errors.firstName.message}</p>}
                    </div>
                    <div>
                        <label className="text-sm text-neutral-700 tracking-wide">Nazwisko</label>
                        <input {...register('lastName')}
                               className="w-full p-2 rounded bg-gray-50 border border-gray-300"/>
                        {errors.lastName && <p className="text-red-500">{errors.lastName.message}</p>}
                    </div>
                    <div className="col-span-2 mt-auto">
                        <label className="text-sm text-neutral-700 tracking-wide">Nagłówek</label>
                        <input {...register('title')} className="w-full p-2 rounded bg-gray-50 border border-gray-300"/>
                        {errors.title && <p className="text-red-500">{errors.title.message}</p>}
                    </div>
                </div>
            </div>

            <div className="pb-2 2xl:pb-3">
                <label className="text-sm text-neutral-700 tracking-wide">Email</label>
                <input {...register('email')} className="w-full bg-gray-50 border border-gray-300 p-2 rounded"/>
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            </div>

            <div className="pb-2 2xl:pb-3">
                <label className="text-sm text-neutral-700 tracking-wide">Telefon</label>
                <input {...register('phone')} className="w-full bg-gray-50 border border-gray-300 p-2 rounded"/>
            </div>

            {activeFields.map((fieldName) => {
                const label = optionalFields.find((f) => f.name === fieldName)?.label;
                return (
                    <div key={fieldName} className="relative pb-2 2xl:pb-3">
                        <label className="text-sm text-neutral-700 tracking-wide">{label}</label>
                        <input {...register(fieldName as keyof FormData)}
                               className="w-full bg-gray-50 border border-gray-300 p-2 rounded"/>
                        <button
                            type="button"
                            onClick={() => handleRemoveField(fieldName)}
                            className="absolute right-2 top-1 text-sm text-red-500"
                        >
                            <EllipsisVertical className="w-4 h-4 cursor-pointer"/>
                        </button>
                    </div>
                );
            })}

            <div className="flex flex-wrap gap-2 mt-3 2xl:mt-5">
                {optionalFields
                    .filter((f) => !activeFields.includes(f.name))
                    .map((f) => (
                        <button
                            key={f.name}
                            type="button"
                            onClick={() => handleAddField(f.name)}
                            className="border border-gray-400 transition-all duration-300 hover:bg-stone-50 px-2 py-1 rounded text-sm cursor-pointer flex items-center justify-between text-neutral-700 tracking-wide"
                        >
                            <Plus className="w-4 h-4 text-neutral-500 me-1"/> {f.label}
                        </button>
                    ))}
            </div>
        </AccordionItem>
    );
}
