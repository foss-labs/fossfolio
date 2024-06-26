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
		try {
			const formInfo = await FormModel.findOne({
				id: formId,
			});
			if (!formInfo) {
				throw FFError.notFound(
					`${SystemTable.FormFields}: Query Failed : 
          form with id ${formId} could not be found`,
				);
			}

			const newField = await FormFieldsModel.insert({
				description: '',
				fk_form_id: formInfo.id,
				placeholder: data.placeholder,
				required: data.require,
				type: data.type,
				name: data.label,
			});

			if (data.options) {
				for (const key of data.options) {
					await FormFieldOptionsModel.insert({
						fk_form_id: newField.id,
						option: key,
					});
				}
			}

			return {
				ok: true,
				message: 'Schema added successfully',
			};
		} catch (e) {
			if (e instanceof NotFoundException) {
				throw new NotFoundException();
			}
			throw e;
		}
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
