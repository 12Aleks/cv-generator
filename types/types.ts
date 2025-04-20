import ExperienceForm from "@/app/components/ExperienceForm";

export type Language = {
    id: string;
    name: string;
    level: string;
    language: string;
};

export type Hobby = {
    id: string;
    description: string;
}

export type TitleFieldsOnly = Extract<{
    [K in keyof FormData]: NonNullable<FormData[K]> extends string ? K : never
}[keyof FormData], string>;

export type FormData = {
    personalInfoTitle: string;
    firstName: string;
    lastName: string;
    title: string;
    email: string;
    phone?: string;
    citizenship?: string;
    site?: string;
    birthDate?: string;
    birthPlace?: string;
    driversLicense?: string;
    gender?: string;
    maritalStatus?: string;
    linkedin?: string;
    customField?: string;
    profileTitle?: string;
    profile?: string;
    experienceTitle?: string;
    skillsTitle?: string;
    languagesTitle?: string;
    languages?: Language[];
    hobbyTitle?: string;
    hobby?: Hobby[];
    footerTitle?: string;
    footer?: string;
};