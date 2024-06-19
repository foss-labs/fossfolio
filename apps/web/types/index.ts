import { IFormInput } from "@app/views/form";

export interface Child {
  children: React.ReactNode;
}

interface DbProps {
  created_at: Date;
  updated_at: Date;
  id: string;
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
  id: string;
  fk_user_id: string;
  role: Role;
  created_at: Date;
  updated_at: Date;
  photo_url: string;
  email: string;
  display_name: string;
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
  slug: string;
  fk_organization_id: string;
  description: string | null;
  cover_image: string;
  website: string;
  location: string;
  is_published: boolean;
  created_at: Date;
  updated_at: Date;
  event_date: Date;
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

export const TabName = [
  { value: "events", title: "All Events" },
  { value: "teams", title: "Members" },
  { value: "settings", title: "Settings" },
] as const;

export type Tabs = (typeof TabName)[number]["value"];

export interface AllForms extends DbProps {
  fk_event_id: string;
  title: string;
  description: string;
  logo_url: string | null;
  banner_url: string;
  confirmation_message: string;
  misc: Record<string, any>;
  is_default_form: boolean;
  is_published: boolean;
  total_submissions: number;
}
