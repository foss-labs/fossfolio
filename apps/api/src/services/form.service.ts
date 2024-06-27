import {
	Injectable,
	InternalServerErrorException,
	NotFoundException,
} from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { EventsService } from './events.service';
import { FormFieldOptionsModel, FormFieldsModel, FormModel } from '@api/models';
import { CreateFormFieldDto, EditFormFieldDto } from '@api/dto/form-field.dto';
import { SystemTable } from '@api/utils/db';
import { FFError } from '@api/utils/error';
import { NewFormDto, UpdateFormDto } from '@api/dto/form.dto';
import { FieldType } from '@prisma/client';

@Injectable()
export class FormService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly EventService: EventsService,
	) {}

	async getAllForm(eventId: string) {
		return await FormModel.getAllFormsWithSubmissionsCount(eventId);
	}

	async createNewForm(data: NewFormDto, eventId: string) {
		return await FormModel.insert({
			...data,
			fk_event_id: eventId,
		});
	}

	async updateForm(data: UpdateFormDto, eventid: string, formid: string) {
		return await FormModel.update(
			{
				id: formid,
				fk_event_id: eventid,
			},
			data,
		);
	}

	async deleteFormField(fieldId: string) {
		return await FormFieldsModel.delete({
			id: fieldId,
		});
	}

	async editFormField(data: EditFormFieldDto, fieldId: string) {
		return await FormFieldsModel.update(
			{
				id: fieldId,
			},
			data,
		);
	}

	async createFormField(data: CreateFormFieldDto, formId: string) {
		// TODO - @Sreehari2003. Create a global middleware
		// We have the orgId, eventId, formId or something which we can use to get the OrgMemberRole.
		// Handle If it exists and all access related in the single global middleware
		const formInfo = await FormModel.findOne({
			id: formId,
		});

		if (!formInfo) {
			FFError.notFound(
				`${SystemTable.FormFields}: Query Failed : 
          form with id ${formId} could not be found`,
			);
		}

		const field = await FormFieldsModel.insert({
			...data,
			fk_form_id: formId,
		});

		if (
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			[FieldType.MultiSelect, FieldType.SingleSelect].includes(field.type as any) &&
			data.options
		) {
			const insertObj = data.options.map((c) => ({
				fk_form_id: formId,
				fk_field_id: field.id,
				option: c,
			}));

			await FormFieldOptionsModel.insertMany(insertObj);
		}

		return field;
	}

	async toggleFormPublishStatus(eventSlug: string, shouldPublish: boolean) {
		try {
			const event = await this.prismaService.events.findUnique({
				where: {
					slug: eventSlug,
				},
				select: {
					form: true,
				},
			});
			if (!event) {
				throw new NotFoundException();
			}

			if (!event.form.length) {
				throw new InternalServerErrorException();
			}

			const newEventStatus = await this.prismaService.events.update({
				where: {
					slug: eventSlug,
				},
				data: {
					isFormPublished: shouldPublish,
				},
			});

			return {
				ok: 'true',
				message: 'form status was changed',
				data: newEventStatus,
			};
		} catch (e) {
			if (e instanceof InternalServerErrorException) {
				throw new InternalServerErrorException({
					message: 'Please create a form schema to publish the form',
				});
			}
			if (e instanceof NotFoundException) {
				throw new NotFoundException();
			}

			return e;
		}
	}

	async getEventFormScheme(formId: string) {
		return await FormFieldsModel.getFieldWithOptions(formId);
	}

	public async addUserFormSubmission(
		info: Record<string, string | Array<string>>,
		eventId: string,
		userId: string,
	) {
		const event = await this.EventService.getEventById(eventId);
		if (!event) return new NotFoundException();

		await this.prismaService.response.create({
			data: {
				data: info,
				user: {
					connect: {
						uid: userId,
					},
				},
				Events: {
					connect: {
						id: event.id,
					},
				},
			},
		});
	}

	async getRegisteredParticipantsFormSubmissions(id: string, userId: string) {
		try {
			const schema = await this.prismaService.events.findUnique({
				where: {
					slug: id,
				},
				select: {
					form: true,
					id: true,
				},
			});

			const label = {};
			schema.form.forEach((el) => {
				label[el.id] = el.label;
			});

			const data = await this.prismaService.response.findMany({
				where: {
					userUid: userId,
					eventsId: schema.id,
				},
			});
			if (!data) return new NotFoundException();

			const result = {};

			schema.form.forEach((el) => {
				// @ts-ignore
				if (data[0] && el.id in data[0].data) {
					result[el.label] = data[0].data[el.id];
				}
			});

			return {
				ok: true,
				data: result,
				message: 'received form successfully',
			};
		} catch (e) {
			if (e instanceof NotFoundException) {
				throw new NotFoundException();
			}
			throw e;
		}
	}
}
