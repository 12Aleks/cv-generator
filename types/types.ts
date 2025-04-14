
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

export type FormData = {
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
    profile?: string;
    languages?: Language[];
    hobby?: Hobby[];
    footer?: string;
};