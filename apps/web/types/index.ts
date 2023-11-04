export interface Child {
    children: React.ReactNode;
}

export interface User {
    uid: string;
    displayName: string;
    email: string;
    slug: string;
    photoURL: string;
}

export type Member = {
    user: {
        uid: string;
        email: string;
        displayName: string;
        slug: string;
    };
    role: Roles;
};

type Organization = {
    id: string;
    name: string;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
};

export interface IOrg {
    count: number;
    orgs: {
        organization: Organization;
        role: Roles;
    }[];
}

export enum Roles {
    Admin = 'ADMIN',
    Editor = 'EDITOR',
    Viewer = 'VIEWER',
}

export type Role = 'ADMIN' | 'EDITOR' | 'VIEWER';

export interface OrgEvents {
    id: string;
    name: string;
    website: string;
    location: string;
    createdAt: Date;
    updatedAt: Date;
    isPublished: boolean;
    description: JSON | null;
}
