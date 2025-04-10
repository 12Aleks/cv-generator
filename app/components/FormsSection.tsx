'use client';

import { FormProvider } from 'react-hook-form';
import PersonalInfoForm from './PersonalInfoForm';
import ProfileForm from './ProfileForm';
import ExperienceForm from './ExperienceForm';
import SkillsForm from './SkillsForm';
import LanguagesForm from './LanguagesForm';
import { UseFormReturn } from 'react-hook-form';
import { FormData } from '@/types/types';

interface FormsSectionProps {
    methods: UseFormReturn<FormData>;
}

export default function FormsSection({ methods }: FormsSectionProps) {
    return (
        <div className="space-y-4">
            <FormProvider {...methods}>
                <PersonalInfoForm />
                <ProfileForm />
                <ExperienceForm />
                <SkillsForm />
                <LanguagesForm />
            </FormProvider>
        </div>
    );
}

