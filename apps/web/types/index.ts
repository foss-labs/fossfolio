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
