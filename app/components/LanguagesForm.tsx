'use client';
import { useForm } from 'react-hook-form';
import AccordionItem from './AccordionItem';

export default function LanguagesForm() {
    const { register, handleSubmit } = useForm();
    const onSubmit = (data: any) => console.log(data);

    return (
        <AccordionItem title="Języki">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
                <input {...register('language')} placeholder="Język" className="input" />
                <input {...register('level')} placeholder="Poziom" className="input" />
                <button type="submit" className="btn">Zapisz</button>
            </form>
        </AccordionItem>
    );
}