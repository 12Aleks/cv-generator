import {z} from 'zod';

export const personalInfoSchema = z.object({
    firstName: z.string().min(2, 'Min 2 znaki'),
    lastName: z.string().min(2, 'Min 2 znaki'),
    title: z.string().max(70, 'Max 70 znakow'),
    email: z.string().email('Nieprawidłowy email'),
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
});