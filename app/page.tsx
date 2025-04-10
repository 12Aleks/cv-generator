"use client"
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {personalInfoSchema} from '@/app/lib/zoodSchema';
import {FormData} from "@/types/types";
import Navbar from './components/Navbar';
import FormsSection from './components/FormsSection';

export default function Home() {
    const methods = useForm<FormData>({
        resolver: zodResolver(personalInfoSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            title: "",
            email: "",
            phone: "",
            citizenship: "",
            site: "",
            birthDate: "",
            birthPlace: "",
            driversLicense: "",
            gender: "",
            maritalStatus: "",
            linkedin: "",
            customField: "",
            profile: "",
            languages: [{ id: crypto.randomUUID(), name: '', level: 'A1', language: 'Unknown' }]
        }
    });

    return (
        <>
            <Navbar/>
            <div className="max-w-3/4 mx-auto p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-4">
                        <FormsSection methods={methods}/>
                    </div>
                    <div className="space-y-4">
                        <h1 className="text-center">Preview</h1>
                    </div>
                </div>
            </div>
        </>
    );
}
