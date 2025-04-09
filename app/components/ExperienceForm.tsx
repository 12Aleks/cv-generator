'use client';
import { useForm } from 'react-hook-form';
import AccordionItem from './AccordionItem';

export default function ExperienceForm() {
    const { register, handleSubmit } = useForm();
    const onSubmit = (data: any) => console.log(data);

    return (
        <AccordionItem title="Doświadczenie zawodowe">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
                <input {...register('position')} placeholder="Stanowisko" className="input" />
                <input {...register('company')} placeholder="Firma" className="input" />
                <input {...register('years')} placeholder="Lata pracy" className="input" />
                <button type="submit" className="btn">Zapisz</button>
            </form>
        </AccordionItem>
    );
}