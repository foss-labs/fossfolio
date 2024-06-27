import { Injectable } from '@nestjs/common';
import {
	CreateEventDto,
	EventParams,
	UpdateEventDto,
} from '@api/dto/events.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CommentModel, EventModel, FormModel, KanbanModal } from '@api/models';
import { User } from '@api/db/schema';
import { stripUndefinedOrNull } from '@api/utils';
import { FFError } from '@api/utils/error';
import { hyphenate } from '@api/utils/hyphenate';

@Injectable()
export class EventsService {
	constructor(private readonly eventEmitter: EventEmitter2) {}

	public async getEventById(id: string) {
		return await EventModel.findById(id);
	}

	public async getEventBySlug(slug: string) {
		return await EventModel.findOne({
			slug,
		});
	}

	async createEvent({
		newEvent,
		user,
		orgId,
	}: {
		newEvent: CreateEventDto;
		user: User;
		orgId: string;
	}) {
		const totalEventCount = await EventModel.count({
			slug: hyphenate(newEvent.name),
		});

		let slug: string;

		if (totalEventCount > 0) {
			slug = hyphenate(`${newEvent.name}-${totalEventCount + 1}`);
		} else {
			slug = hyphenate(newEvent.name);
		}

		const event = await EventModel.insert({
			...newEvent,
			fk_organization_id: orgId,
			slug,
		});

		// Creating an Event will create a default Form
		await FormModel.insert({
			fk_event_id: event.id,
			title: 'Default Form',
			description: 'Default Form Description',
			confirmation_message: 'This message is shown after form submission',
			is_default_form: true,
		});

		// Creating an Event will create a Kanban board
		await KanbanModal.insertMany([
			{
				fk_event_id: event.id,
				title: 'Todo',
			},
			{
				fk_event_id: event.id,
				title: 'In Progress',
			},
			{
				fk_event_id: event.id,
				title: 'Done',
			},
		]);

		this.eventEmitter.emit('event.created', event, user.id);
	}

	async updateEvent({
		updateData,
		user: _user,
		orgId,
		eventId,
	}: {
		updateData: UpdateEventDto;
		user: User;
		orgId: string;
		eventId: string;
	}) {
		const updateObj = stripUndefinedOrNull(updateData);

		const updateEvent = EventModel.update(
			{
				id: eventId,
				fk_organization_id: orgId,
			},
			updateObj,
		);

		this.eventEmitter.emit('event.updated', updateEvent);

		return updateEvent;
	}

	async getAllEvents(query = '') {
		const events = await EventModel.find({
			name: query,
		});

		return events;
	}

	async deleteEvent({ eventId, orgId }: EventParams) {
		const event = await EventModel.findOne({
			id: eventId,
			fk_organization_id: orgId,
		});

		if (!event) {
			FFError.badRequest('There is no event with this id');
		}

		if (event?.is_published) {
			FFError.badRequest('Cannot delete published event');
		}

		await KanbanModal.delete({
			fk_event_id: eventId,
		});

		await CommentModel.delete({
			fk_event_id: eventId,
		});

		// TODO: @DarkPhoenix2704 Delete all associated data also

		return await EventModel.delete({
			id: eventId,
			fk_organization_id: orgId,
		});
	}
}
