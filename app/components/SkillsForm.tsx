'use client';
import { useForm } from 'react-hook-form';
import AccordionItem from './AccordionItem';

export default function SkillsForm() {
    const { register, handleSubmit } = useForm();
    const onSubmit = (data: any) => console.log(data);

    return (
        <AccordionItem title="Umiejętności">
            <form onSubmit={handleSubmit(onSubmit)}>
                <textarea {...register('skills')} placeholder="Wypisz umiejętności" className="w-full border p-2 rounded" />
                <button type="submit" className="btn mt-2">Zapisz</button>
            </form>
        </AccordionItem>
    );
}