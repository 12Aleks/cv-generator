"use client"
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {personalInfoSchema} from '@/app/lib/zoodSchema';
import {FormData} from "@/types/types";
import { v4 as uuidv4 } from 'uuid';
import Navbar from './components/Navbar';
import FormsSection from './components/FormsSection';

export default function Home() {
    const methods = useForm<FormData>({
        resolver: zodResolver(personalInfoSchema),
        defaultValues: {
            personalInfoTitle: "Dane osobowe",
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
            profileTitle: "Profil",
            profile: "",
            experienceTitle: "Doświadczenie zawodowe",
            skillsTitle: "Umiejętności",
            languagesTitle: "Języki",
            languages: [{ id: uuidv4(), name: '', level: 'A1', language: 'Unknown' }],
            hobbyTitle: "Hobby i zainteresowania",
            hobby: [{ id: uuidv4(), description: ''}],
            footerTitle: "Stopka",
            footer: "",
        }
    });

    return (
        <>
            <Navbar/>
            <div className="max-w-full 2xl:max-w-3/4 mx-auto px-3 py-10">
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
