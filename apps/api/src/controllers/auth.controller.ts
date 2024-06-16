import { Controller, Get, Response, UseGuards, Request } from '@nestjs/common';
import { GithubAuthGuard } from '@api/services/auth/guards/github-oauth.guard';
import { AuthService } from '@api/services/auth/auth.service';
import { cookieHandler } from '@api/services/auth/cookieHandler';
import { RefreshGuard } from '@api/services/auth/guards/refresh.guard';
import { GoogleAuthGuard } from '@api/services/auth/guards/google-oauth.guard';
import { Response as EResponse, Request as ERequest } from 'express';
import { AuthUser } from '@api/services/auth/decorators/user.decorator';
import { User } from '@api/db/schema';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly configService: ConfigService,
	) {}

	// Route to Initiate GitHub OAuth
	@Get('/github')
	@UseGuards(GithubAuthGuard)
	async githubOAuth() {}

	// Route to Handle GitHub OAuth Callback
	@Get('/github/callback')
	@UseGuards(GithubAuthGuard)
	async githubOAuthCallback(
		@AuthUser() user: User,
		@Response() res: EResponse,
	) {
		const authToken = await this.authService.generateAuthToken(user.id);
		cookieHandler(res, authToken, true);
	}

	@Get('/google')
	@UseGuards(GoogleAuthGuard)
	async googleOAuth() {}

	@Get('/google/callback')
	@UseGuards(GoogleAuthGuard)
	async googleOAuthCallback(
		@AuthUser() user: User,
		@Response() res: EResponse,
	) {
		const authToken = await this.authService.generateAuthToken(user.id);
		cookieHandler(res, authToken, true);
	}

	@Get('/refresh')
	@UseGuards(RefreshGuard)
	async refresh(
		@Request() req: ERequest,
		@AuthUser() user: User,
		@Response() res: EResponse,
	) {
		const genToken = await this.authService.refreshAuthToken(
			user,
			req.cookies.refresh_token,
		);

		cookieHandler(res, genToken, false);
	}

	@Get('/logout')
	async logout(@Response() res: EResponse) {
		res.clearCookie('access_token');
		res.clearCookie('refresh_token');

		res.redirect(this.configService.get<string>('CLIENT_URL') as string);
	}
}
