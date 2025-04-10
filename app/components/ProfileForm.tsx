'use client';
import { useFormContext } from 'react-hook-form';
import AccordionItem from './AccordionItem';
import { FormData } from "@/types/types"

export default function ProfileForm() {
    const { register } = useFormContext<FormData>();

    return (
        <AccordionItem title="Profil">
            <label className="text-sm text-neutral-700 tracking-wide">Opis</label>
            <textarea
                rows={6}
                {...register('profile')}
                className="w-full p-2 rounded bg-gray-50 border border-gray-300"
            />
        </AccordionItem>
    );
}
