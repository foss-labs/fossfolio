import { customAlphabet } from 'nanoid';

export type SystemFields = 'id' | 'created_at' | 'updated_at' | 'is_deleted';

export enum SystemTable {
	User = 'ff_user',
	Account = 'ff_account',
	Org = 'ff_organization',
	OrgMember = 'ff_organization_member',
	OrgInvite = 'ff_organization_invite',
	Events = 'ff_events',
	EventTicket = 'ff_event_ticket',
	Form = 'ff_form',
	FormFields = 'ff_form_fields',
	FormFieldOptions = 'ff_form_field_options',
	FormResponse = 'ff_form_response',
	Ticket = 'ff_ticket',
	Kanban = 'ff_kanban',
	KanbanCard = 'ff_kanban_card',
	Comment = 'ff_comment',
	FF_Migrations = 'ff_migrations',
}

export const IDPrefix = {
	[SystemTable.User]: 'usr',
	[SystemTable.Account]: 'acc',
	[SystemTable.Org]: 'org',
	[SystemTable.OrgMember]: 'orm',
	[SystemTable.OrgInvite]: 'oin',
	[SystemTable.Events]: 'evt',
	[SystemTable.EventTicket]: 'evt',
	[SystemTable.Form]: 'frm',
	[SystemTable.FormFields]: 'fld',
	[SystemTable.FormFieldOptions]: 'ffo',
	[SystemTable.FormResponse]: 'frs',
	[SystemTable.Ticket]: 'tkt',
	[SystemTable.Kanban]: 'kan',
	[SystemTable.KanbanCard]: 'kcd',
	[SystemTable.Comment]: 'cmt',
	[SystemTable.FF_Migrations]: 'mig',
};

export enum Role {
	ADMIN = 'admin',
	EDITOR = 'editor',
	VIEWER = 'viewer',
}

const nanoid = customAlphabet(
	'0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
	15,
);

export const FormInput = [
	'SingleLineText',
	'LongText',
	'SingleSelect',
	'MultiSelect',
	'Checkbox',
	'Number',
	'Email',
	'Url',
	'PhoneNumber',
	'Attachment',
] as const;

export const generateID = (table: SystemTable) => {
	const prefix = IDPrefix[table];
	const id = `${prefix}${nanoid()}`;
	return id;
};
