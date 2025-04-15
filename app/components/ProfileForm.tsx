'use client';
import { useFormContext } from 'react-hook-form';
import AccordionItem from './AccordionItem';
import { FormData } from "@/types/types"
import TiptapEditor from "@/app/components/TiptapEditor";

export default function ProfileForm() {
    const { register } = useFormContext<FormData>();

    return (
        <AccordionItem title="Profil">
            <label className="text-sm text-neutral-700 tracking-wide">Opis</label>
            <TiptapEditor name="profile" />
        </AccordionItem>
    );
}
