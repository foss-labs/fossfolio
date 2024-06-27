import {
	ConflictException,
	Injectable,
	InternalServerErrorException,
	NotFoundException,
	ServiceUnavailableException,
} from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { S3Service } from './cloud.service';
import { EventParams } from '@api/dto/events.dto';
import BaseContext from '@api/BaseContext';
import { SystemTable } from '@api/utils/db';
import { EventModel, EventTicketModel } from '@api/models';

@Injectable()
export class OrgEventsService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly cloudService: S3Service,
	) {}

	async registerEvent(eventSlug: string, userId: string) {
		try {
			return {
				ok: true,
				message: 'Event register successfully',
			};
		} catch (e) {
			if (e instanceof NotFoundException) {
				throw new NotFoundException();
			}
			if (e instanceof ServiceUnavailableException) {
				throw new ServiceUnavailableException();
			}
			if (e instanceof ConflictException) {
				throw new ConflictException('user already registered');
			}
			throw e;
		}
	}

	async getEventParticipants({ orgId, eventId }: EventParams) {
		try {
			const userInfo = await EventTicketModel.getEventParticipants({
				orgId,
				eventId,
			});

			if (!userInfo) {
				throw new NotFoundException('Events not found');
			}

			return {
				ok: true,
				message: 'members found successfully',
				data: userInfo,
			};
		} catch (e) {
			if (e instanceof NotFoundException) {
				throw new NotFoundException('Event not found');
			}
			throw e;
		}
	}

	async getEventRegistartionStatus(slugId: string, userId: string) {
		try {
			const data = await this.prismaService.events.findUnique({
				where: {
					slug: slugId,
				},
				select: {
					Ticket: {
						where: {
							userUid: userId,
						},
					},
				},
			});

			if (!data || !data.Ticket.length) {
				throw new NotFoundException();
			}

			return {
				ok: true,
				message: 'User found successfully',
				isRegistred: true,
			};
		} catch (e) {
			if (e instanceof NotFoundException) {
				throw new NotFoundException();
			}
			throw new InternalServerErrorException({
				error: e,
			});
		}
	}

	async uploadEventCover(file: Express.Multer.File, eventSlug: string) {
		try {
			const publicUrl = await this.cloudService.uploadFile(file);
			if (!publicUrl) {
				return new InternalServerErrorException();
			}

			const updatedEventCover = await this.prismaService.events.update({
				where: {
					slug: eventSlug,
				},
				data: {
					coverImage: publicUrl,
				},
			});

			if (!updatedEventCover) {
				throw new InternalServerErrorException();
			}
			return {
				ok: true,
				data: updatedEventCover,
				message: 'image uploaded successfully',
			};
		} catch (e) {
			if (e instanceof InternalServerErrorException) {
				throw new InternalServerErrorException();
			}
		}
	}

	async getTicketInfo(id: string) {
		try {
			const event = await this.prismaService.events.findUnique({
				where: {
					id,
				},
				select: {
					eventDate: true,
					description: true,
					isCollegeEvent: true,
					coverImage: true,
					location: true,
					name: true,
				},
			});
			if (!event) {
				throw new NotFoundException();
			}

			return {
				ok: true,
				message: 'Event schema found',
				data: event,
			};
		} catch (e) {
			if (e instanceof NotFoundException) {
				throw new NotFoundException();
			}
			throw e;
		}
	}

	async removeParticipant(eventId: string, userId: string) {
		try {
			const isUserExist = await this.prismaService.ticket.findFirst({
				where: {
					eventsId: eventId,
					userUid: userId,
				},
			});

			if (!isUserExist) {
				throw new NotFoundException();
			}

			await this.prismaService.ticket.delete({
				where: {
					id: isUserExist.id,
				},
			});

			return {
				ok: true,
				message: 'user was removed successfully',
			};
		} catch (e) {
			if (e instanceof NotFoundException) {
				throw new NotFoundException();
			}
			throw new ServiceUnavailableException();
		}
	}

	async getEventStats(id: string) {
		try {
			const eventInfo = await this.prismaService.events.findUnique({
				where: {
					slug: id,
				},
			});

			if (!eventInfo) throw new NotFoundException();

			const insights = await this.prismaService.ticket.groupBy({
				by: ['createdAt'],
				where: {
					eventsId: eventInfo.id,
				},
				_count: true,
			});

			const stats = await this.prismaService.user.aggregate({
				where: {
					Ticket: {
						some: {
							eventsId: eventInfo.id,
						},
					},
				},
				_count: true,
			});

			const totalRevenue = stats._count * eventInfo.ticketPrice;

			const data = {
				totalRevenue: totalRevenue || 0,
				totalTickets: stats._count || 0,
				insights: this.aggregateCountsByDay(insights),
			};

			return {
				data,
				message: 'Data Found successfully',
			};
		} catch {
			throw new NotFoundException();
		}
	}

	async deleteForm(slug: string) {
		try {
			await this.prismaService.events.update({
				where: {
					slug,
				},
				data: {
					form: {
						deleteMany: {},
					},
				},
			});
			return {
				ok: true,
				message: 'form deleted successfully',
			};
		} catch {
			throw new InternalServerErrorException();
		}
	}

	private aggregateCountsByDay(responses: Insights[]) {
		const aggregatedCounts = {};

		for (const res of responses) {
			const date = new Date(res.createdAt).toISOString().split('T')[0];

			// Initialize count for the day if not exists
			if (!aggregatedCounts[date]) {
				aggregatedCounts[date] = 0;
			}

			// Add count to the existing count for the day
			aggregatedCounts[date] += res._count;
		}

		return aggregatedCounts;
	}
}

type Insights = {
	_count: number;
	createdAt: Date;
};
