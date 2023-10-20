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
    role: 'ADMIN' | 'EDITOR' | 'VIEWER';
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
        role: 'ADMIN' | 'EDITOR' | 'VIEWER';
    }[];
}

export enum Roles {
    Admin = 'ADMIN',
    Editor = 'EDITOR',
    Viewer = 'VIEWER',
}

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
