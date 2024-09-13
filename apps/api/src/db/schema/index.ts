import { User, UserCreateSchema, UserUpdateSchema } from './user';
import { Account, AccountCreateSchema, AccountUpdateSchema } from './account';
import {
	Organization,
	OrganizationCreateSchema,
	OrganizationUpdateSchema,
} from './organization';
import {
	OrganizationMember,
	OrganizationMemberCreateSchema,
	OrganizationMemberUpdateSchema,
} from './organization-member';
import {
	OrganizationInvite,
	OrganizationInviteCreateSchema,
	OrganizationInviteUpdateSchema,
} from './organization-invite';
import { Event, EventCreateSchema, EventUpdateSchema } from './events';
import {
	EventTicket,
	EventTicketCreateSchema,
	EventTicketUpdateSchema,
} from './event-ticket';
import { Form, FormCreateSchema, FormUpdateSchema } from './form';
import {
	FormField,
	FormFieldCreateSchema,
	FormFieldUpdateSchema,
} from './form-fields';
import {
	FormFieldOptions,
	FormFieldOptionsCreateSchema,
	FormFieldOptionsUpdateSchema,
} from './form-field-options';
import {
	FormResponse,
	FormResponseCreateSchema,
	FormResponseUpdateSchema,
} from './form-response';
import { Ticket, TicketCreateSchema, TicketUpdateSchema } from './tickets';
import { Kanban, KanbanCreateSchema, KanbanUpdateSchema } from './Kanban';
import {
	KanbanCard,
	KanbanCardCreateSchema,
	KanbanCardUpdateSchema,
} from './kanban-card';
import { Comment, CommentCreateSchema, CommentUpdateSchema } from './comment';

export {
	User,
	UserCreateSchema,
	UserUpdateSchema,
	Account,
	AccountCreateSchema,
	AccountUpdateSchema,
	Organization,
	OrganizationCreateSchema,
	OrganizationUpdateSchema,
	OrganizationMember,
	OrganizationMemberCreateSchema,
	OrganizationMemberUpdateSchema,
	OrganizationInvite,
	OrganizationInviteCreateSchema,
	OrganizationInviteUpdateSchema,
	Event,
	EventCreateSchema,
	EventUpdateSchema,
	EventTicket,
	EventTicketCreateSchema,
	EventTicketUpdateSchema,
	Form,
	FormCreateSchema,
	FormUpdateSchema,
	FormField,
	FormFieldCreateSchema,
	FormFieldUpdateSchema,
	FormFieldOptions,
	FormFieldOptionsCreateSchema,
	FormFieldOptionsUpdateSchema,
	FormResponse,
	FormResponseCreateSchema,
	FormResponseUpdateSchema,
	Ticket,
	TicketCreateSchema,
	TicketUpdateSchema,
	Kanban,
	KanbanCreateSchema,
	KanbanUpdateSchema,
	KanbanCard,
	KanbanCardCreateSchema,
	KanbanCardUpdateSchema,
	Comment,
	CommentCreateSchema,
	CommentUpdateSchema,
};

import { SystemTable } from '@api/utils/db';

type InputFields =
	| 'SingleLineText'
	| 'LongText'
	| 'SingleSelect'
	| 'MultiSelect'
	| 'Checkbox'
	| 'Number'
	| 'Email'
	| 'URL'
	| 'PhoneNumber'
	| 'Attachment';

export type FormInput = Exclude<InputFields, 'Attachment'>;

type CreateRowSchema = {
	[SystemTable.User]: UserCreateSchema;
	[SystemTable.Account]: AccountCreateSchema;
	[SystemTable.Org]: OrganizationCreateSchema;
	[SystemTable.OrgMember]: OrganizationMemberCreateSchema;
	[SystemTable.OrgInvite]: OrganizationInviteCreateSchema;
	[SystemTable.Events]: EventCreateSchema;
	[SystemTable.EventTicket]: EventTicketCreateSchema;
	[SystemTable.Form]: FormCreateSchema;
	[SystemTable.FormFields]: FormFieldCreateSchema;
	[SystemTable.FormFieldOptions]: FormFieldOptionsCreateSchema;
	[SystemTable.FormResponse]: FormResponseCreateSchema;
	[SystemTable.Ticket]: TicketCreateSchema;
	[SystemTable.Kanban]: KanbanCreateSchema;
	[SystemTable.KanbanCard]: KanbanCardCreateSchema;
	[SystemTable.Comment]: CommentCreateSchema;
	// biome-ignore lint/suspicious/noExplicitAny: FF_Migrations is a migration table. It should not be modified.
	[SystemTable.FF_Migrations]: any;
};

export type CreateSchema<K extends SystemTable> = CreateRowSchema[K];

type UpdateRowSchema = {
	[SystemTable.User]: UserUpdateSchema;
	[SystemTable.Account]: AccountUpdateSchema;
	[SystemTable.Org]: OrganizationUpdateSchema;
	[SystemTable.OrgMember]: OrganizationMemberUpdateSchema;
	[SystemTable.OrgInvite]: OrganizationInviteUpdateSchema;
	[SystemTable.Events]: EventUpdateSchema;
	[SystemTable.EventTicket]: EventTicketUpdateSchema;
	[SystemTable.Form]: FormUpdateSchema;
	[SystemTable.FormFields]: FormFieldUpdateSchema;
	[SystemTable.FormFieldOptions]: FormFieldOptionsUpdateSchema;
	[SystemTable.FormResponse]: FormResponseUpdateSchema;
	[SystemTable.Ticket]: TicketUpdateSchema;
	[SystemTable.Kanban]: KanbanUpdateSchema;
	[SystemTable.KanbanCard]: KanbanCardUpdateSchema;
	[SystemTable.Comment]: CommentUpdateSchema;
	// biome-ignore lint/suspicious/noExplicitAny: FF_Migrations is a migration table. It should not be modified.
	[SystemTable.FF_Migrations]: any;
};

export type UpdateSchema<K extends SystemTable> = UpdateRowSchema[K];
