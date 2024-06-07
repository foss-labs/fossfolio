import { Injectable, NotFoundException } from '@nestjs/common';
import type { Profile } from 'passport';
import { USER_UPDATE_ERROR } from '../error';
import { PrismaService } from './prisma.service';
import type { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@api/db/schema';
import { fakerEN } from '@faker-js/faker';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ConfigService } from '@nestjs/config'; 
import { UserModel } from '@api/models/User';
import { AccountModel } from '@api/models';

@Injectable()
export class UserService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly eventEmitter: EventEmitter2,
		private readonly configService:ConfigService
	) {}

	async findUserBySlug(slug: string) {
		try {
			const user = await this.prismaService.user.findUnique({
				where: {
					slug,
				},
			});
			return user;
		} catch (e) {
			return null;
		}
	}

	async createOAuthUser(
		accessToken: string,
		refreshToken: string,
		profile: Profile,
		email: string,
	) {
		const userDisplayName = profile.displayName ? profile.displayName : '';
		const userPhotoURL = profile.photos ? profile.photos[0].value : '';

		let slug: string;
		while (true) {
			slug = this.generateSlug();
			const user = await this.findUserBySlug(slug);
			if (user) continue;
			break;
		}

		const user = await UserModel.insert({
			display_name: userDisplayName,
			email,
			photo_url: userPhotoURL,
			slug,
			refresh_token: '',
		});

		await AccountModel.insert({
			provider: profile.provider,
			provider_account_id: profile.id,
			provider_access_token: accessToken,
			provider_refresh_token: refreshToken,
			fk_user_id: user.id,
		});

		const isProd = Boolean(this.configService.get("NODE_ENV"));
    
		if(isProd){
			this.eventEmitter.emit('user.registered', {
				email: user.email,
				name: user.display_name,
				avatarUrl: user.photo_url,
			});
		}
	
		return user;
	}

	async findUserById(id: string) {
		return await UserModel.findById(id);
	}

	async updateUser(authUser: User, updateUserDto: UpdateUserDto) {
		try {
			const user = await this.prismaService.user.update({
				where: {
					uid: authUser.id,
				},
				data: {
					slug: updateUserDto.slug ? updateUserDto.slug : authUser.slug,
					photoURL: updateUserDto.photoUrl
						? updateUserDto.photoUrl
						: authUser.photo_url,
					displayName: updateUserDto.displayName
						? updateUserDto.displayName
						: authUser.display_name,
					isStudent: Object.hasOwn(updateUserDto, 'isCollegeStudent')
						? updateUserDto.isCollegeStudent
						: authUser.is_student,
					collegeName: updateUserDto.collegeName || authUser.college_name,
				},
			});

			return user;
		} catch (error) {
			return USER_UPDATE_ERROR;
		}
	}

	async getReservedTickets(id: string) {
		try {
			const data = await this.prismaService.user.findUnique({
				where: {
					uid: id,
				},

				select: {
					Ticket: {
						select: {
							event: true,
						},
					},
				},
			});

			if (!data) {
				throw new NotFoundException();
			}
			return {
				ok: true,
				message: 'Ticket found successfully',
				data: data.Ticket.map((el) => el.event),
			};
		} catch (e) {
			if (e instanceof NotFoundException) {
				throw new NotFoundException();
			}
			return e;
		}
	}

	private generateSlug() {
		return fakerEN.lorem.slug({
			min: 1,
			max: 2,
		});
	}
}
