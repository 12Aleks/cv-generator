'use client';

import { FormProvider, UseFormReturn } from 'react-hook-form';
import { FormData } from '@/types/types';
import PersonalInfoForm from './PersonalInfoForm';
import ProfileForm from './ProfileForm';
import ExperienceForm from './ExperienceForm';
import SkillsForm from './SkillsForm';
import LanguagesForm from './LanguagesForm';
import HobbyForm from '@/app/components/HobbyForm';
import Footer from '@/app/components/Footer';
import SortableFormWrapper from './SortableFormWrapper';



export default function FormsSection() {
    const formSections = [
        { id: 'profile', element: <ProfileForm /> },
        { id: 'experience', element: <ExperienceForm /> },
        { id: 'skills', element: <SkillsForm /> },
        { id: 'languages', element: <LanguagesForm /> },
        { id: 'hobby', element: <HobbyForm /> },
        { id: 'footer', element: <Footer /> },
    ];

    return (
        <div className="space-y-4">
                <div className="ps-6"> <PersonalInfoForm /></div>
                <SortableFormWrapper items={formSections} />
        </div>
    );
}
