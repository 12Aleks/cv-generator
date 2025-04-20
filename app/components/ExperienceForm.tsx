'use client';
import { useFormContext } from 'react-hook-form';
import AccordionItem from './AccordionItem';
import { FormData } from '@/types/types';

export default function ExperienceForm() {
    const { register } = useFormContext<FormData>();

    return (
        <AccordionItem titleName="experienceTitle" defaultTitle="Doświadczenie zawodowe">
            Test
            {/*<input {...register('position')} placeholder="Stanowisko" className="input" />*/}
            {/*<input {...register('company')} placeholder="Firma" className="input" />*/}
            {/*<input {...register('years')} placeholder="Lata pracy" className="input" />*/}
        </AccordionItem>
    );
}

