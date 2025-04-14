'use client';
import { useFormContext } from 'react-hook-form';
import AccordionItem from "@/app/components/AccordionItem";
import {FormData} from "@/types/types";

const Footer = () => {
    const { register } = useFormContext<FormData>();
    return (
        <AccordionItem title="Stopka">
            <label className="text-sm text-neutral-700 tracking-wide">Zawartość</label>
            <textarea
                rows={6}
                {...register('footer')}
                className="w-full p-2 rounded bg-gray-50 border border-gray-300"
            />
        </AccordionItem>
    );
};

export default Footer;