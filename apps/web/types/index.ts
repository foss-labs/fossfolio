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

export type IOrg = {
    organization: {
        id: string;
        name: string;
        slug: string;
        createdAt: Date;
        updatedAt: Date;
    };
    role: 'ADMIN' | 'EDITOR' | 'VIEWER';
};

export enum Roles {
    Admin = 'ADMIN',
    Editor = 'EDITOR',
    Viewer = 'VIEWER',
}
