import { IFormInput } from "@app/views/form";

export interface Child {
  children: React.ReactNode;
}

interface DbProps {
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  display_name: string;
  email: string;
  slug: string;
  photo_url: string;
  is_student: boolean;
  college_name?: string;
  refresh_token: string;
}

export type Member = {
  user: {
    id: string;
    email: string;
    displayName: string;
    slug: string;
  };
  role: Roles;
};

export type Organization = {
  id: string;
  name: string;
  slug: string;
  org_created_at: Date;
  org_updated_at: Date;
  total_members: number;
  total_events: number;
  role: Roles;
  is_verified: boolean;
};

export enum Roles {
  ADMIN = "admin",
  EDITOR = "editor",
  VIEWER = "viewer",
}

export type Role = "admin" | "editor" | "viewer";

export interface OrgEvents {
  id: string;
  name: string;
  website: string;
  location: string;
  createdAt: Date;
  updatedAt: Date;
  isPublished: boolean;
  description: string | null;
  lastDate: Date;
  eventDate: Date;
  maxTicketCount?: number;
  minTicketCount?: number;
  isCollegeEvent?: boolean;
  coverImage?: string;
  isFormPublished: boolean;
  form: Iform[];
  slug: string;
  ticketPrice: number;
}

export type Iform = {
  selectOptions?: Array<{
    option: string;
  }>;
  label: string;
  placeholder?: string;
  options?: Array<string>;
  required: boolean;
  type: IFormInput;
  id?: string;
};

export interface Kanban extends DbProps {
  id: string;
  title: string;
  userUid: string;
  createdBy: UserInKanban;
  tasks: Task[];
  _count: {
    tasks: number;
  };
}

export interface ServerResponse<T> {
  ok: boolean;
  message: string;
  data: T;
}

type UserInKanban = Omit<
  User,
  "slug" | "refreshToken" | "isStudent" | "collegeName" | "uid"
>;
export interface Task extends DbProps {
  id: string;
  title: string;
  createdBy: UserInKanban;
  Comment: Comments[];
}

export interface Comments {
  id: string;
  data: string;
  user: UserInKanban;
}
