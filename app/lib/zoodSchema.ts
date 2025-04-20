import { z } from 'zod';
import SkillsForm from "@/app/components/SkillsForm";

export const languageSchema = z.object({
    id: z.string(),
    name: z.string().min(1, 'Name is required'),
    level: z.string().min(1, 'Level is required'),
    language: z.string().min(1, 'Language is required'),
});

export const hobbySchema = z.object({
    id: z.string(),
    description: z.string(),
})

export const personalInfoSchema = z.object({
    personalInfoTitle: z.string(),
    firstName: z.string().min(2, 'Min 2 characters'),
    lastName: z.string().min(2, 'Min 2 characters'),
    title: z.string().max(70, 'Max 70 characters'),
    email: z.string().email('Invalid email'),
    phone: z.string().optional(),
    citizenship: z.string().optional(),
    site: z.string().optional(),
    birthDate: z.string().optional(),
    birthPlace: z.string().optional(),
    driversLicense: z.string().optional(),
    gender: z.string().optional(),
    maritalStatus: z.string().optional(),
    linkedin: z.string().optional(),
    customField: z.string().optional(),
    profileTitle: z.string().optional(),
    profile: z.string().optional(),
    experienceTitle: z.string().optional(),
    skillsTitle: z.string().optional(),
    languagesTitle: z.string().optional(),
    languages: z.array(languageSchema).optional(),
    hobbyTitle: z.string().optional(),
    hobby: z.array(hobbySchema).optional(),
    footerTitle: z.string().optional(),
    footer: z.string().optional(),
});