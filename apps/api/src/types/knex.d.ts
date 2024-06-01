import { SystemTable } from '@api/utils/db';
import {
	Account,
	AccountCreateSchema,
	AccountUpdateSchema,
	CommentCreateSchema,
	CommentUpdateSchema,
	EventCreateSchema,
	EventTicket,
	EventTicketCreateSchema,
	EventTicketUpdateSchema,
	EventUpdateSchema,
	Form,
	FormCreateSchema,
	FormField,
	FormFieldCreateSchema,
	FormFieldOptions,
	FormFieldUpdateSchema,
	FormResponse,
	FormResponseCreateSchema,
	FormResponseUpdateSchema,
	FormUpdateSchema,
	Kanban,
	KanbanCard,
	KanbanCardCreateSchema,
	KanbanCardUpdateSchema,
	KanbanCreateSchema,
	KanbanUpdateSchema,
	Organization,
	OrganizationCreateSchema,
	OrganizationInvite,
	OrganizationInviteCreateSchema,
	OrganizationInviteUpdateSchema,
	OrganizationMember,
	OrganizationMemberCreateSchema,
	OrganizationMemberUpdateSchema,
	OrganizationUpdateSchema,
	Ticket,
	TicketCreateSchema,
	TicketUpdateSchema,
	User,
	UserCreateSchema,
	UserUpdateSchema,
} from '@api/db/schema';
import { Knex } from 'knex';

declare module 'knex/types/tables' {
	interface Tables {
		[SystemTable.User]: Knex.CompositeTableType<
			User,
			UserCreateSchema,
			UserUpdateSchema
		>;
		[SystemTable.Account]: Knex.CompositeTableType<
			Account,
			AccountCreateSchema,
			AccountUpdateSchema
		>;
		[SystemTable.Organization]: Knex.CompositeTableType<
			Organization,
			OrganizationCreateSchema,
			OrganizationUpdateSchema
		>;
		[SystemTable.OrgMember]: Knex.CompositeTableType<
			OrganizationMember,
			OrganizationMemberCreateSchema,
			OrganizationMemberUpdateSchema
		>;
		[SystemTable.OrgInvite]: Knex.CompositeTableType<
			OrganizationInvite,
			OrganizationInviteCreateSchema,
			OrganizationInviteUpdateSchema
		>;
		[SystemTable.Events]: Knex.CompositeTableType<
			Event,
			EventCreateSchema,
			EventUpdateSchema
		>;
		[SystemTable.EventTicket]: Knex.CompositeTableType<
			EventTicket,
			EventTicketCreateSchema,
			EventTicketUpdateSchema
		>;
		[SystemTable.Form]: Knex.CompositeTableType<
			Form,
			FormCreateSchema,
			FormUpdateSchema
		>;
		[SystemTable.FormFields]: Knex.CompositeTableType<
			FormField,
			FormFieldCreateSchema,
			FormFieldUpdateSchema
		>;
		[SystemTable.FormFieldOptions]: Knex.CompositeTableType<
			FormFieldOptions,
			FormFieldCreateSchema,
			FormFieldUpdateSchema
		>;
		[SystemTable.FormResponse]: Knex.CompositeTableType<
			FormResponse,
			FormResponseCreateSchema,
			FormResponseUpdateSchema
		>;
		[SystemTable.Ticket]: Knex.CompositeTableType<
			Ticket,
			TicketCreateSchema,
			TicketUpdateSchema
		>;
		[SystemTable.Kanban]: Knex.CompositeTableType<
			Kanban,
			KanbanCreateSchema,
			KanbanUpdateSchema
		>;
		[SystemTable.KanbanCard]: Knex.CompositeTableType<
			KanbanCard,
			KanbanCardCreateSchema,
			KanbanCardUpdateSchema
		>;
		[SystemTable.Comment]: Knex.CompositeTableType<
			Comment,
			CommentCreateSchema,
			CommentUpdateSchema
		>;
	}
}
