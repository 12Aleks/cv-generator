'use client';
import { useFormContext } from 'react-hook-form';
import AccordionItem from './AccordionItem';
import { FormData } from '@/types/types';

export default function SkillsForm() {
    const { register } = useFormContext<FormData>();

    return (
        <AccordionItem titleName="skillsTitle" defaultTitle="Umiejętności">
            Test
            {/*<textarea*/}
            {/*    {...register('skills')}*/}
            {/*    placeholder="Wypisz umiejętności"*/}
            {/*    className="w-full border p-2 rounded"*/}
            {/*/>*/}
        </AccordionItem>
    );
}
