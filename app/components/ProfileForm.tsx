'use client';
import { useForm } from 'react-hook-form';
import AccordionItem from './AccordionItem';

export default function ProfileForm() {
    const { register, handleSubmit } = useForm();
    const onSubmit = (data: any) => console.log(data);

    return (
        <AccordionItem title="Profil">
            <form onSubmit={handleSubmit(onSubmit)}>
                <label className="text-sm text-neutral-700 tracking-wide">Opis</label>
                <textarea rows={6} {...register('profile')}
                          className="w-full border p-2 rounded" />
                <button type="submit" className="btn mt-2">Zapisz</button>
            </form>
        </AccordionItem>
    );
}