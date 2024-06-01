import { Controller, Get, Request, Response, UseGuards } from '@nestjs/common';
import { GithubAuthGuard } from '../services/auth/guards/github-oauth.guard';
import { AuthService } from '../services/auth/auth.service';
import { cookieHandler } from '../services/auth/cookieHandler';
import { RefreshGuard } from '../services/auth/guards/refresh.guard';
import { GoogleAuthGuard } from '../services/auth/guards/google-oauth.guard';
import { SamlAuthGuard } from '../services/auth/guards/saml-oauth.guard';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	// Route to Initiate GitHub OAuth
	@Get('/github')
	@UseGuards(GithubAuthGuard)
	async githubOAuth() {}

	// Route to Handle GitHub OAuth Callback
	@Get('/github/callback')
	@UseGuards(GithubAuthGuard)
	async githubOAuthCallback(@Request() req, @Response() res) {
		const authToken = await this.authService.generateAuthToken(req.user.uid);
		cookieHandler(res, authToken, true);
	}

	@Get('/google')
	@UseGuards(GoogleAuthGuard)
	async googleOAuth() {}

	@Get('/google/callback')
	@UseGuards(GoogleAuthGuard)
	async googleOAuthCallback(@Request() req, @Response() res) {
		const authToken = await this.authService.generateAuthToken(req.user.uid);
		cookieHandler(res, authToken, true);
	}

	@Get('/saml')
	@UseGuards(SamlAuthGuard)
	async samlOAuth() {}

	@Get('/saml//callback')
	@UseGuards(SamlAuthGuard)
	async samlOAuthCallback(@Request() req, @Response() res) {
		const genToken = await this.authService.refreshAuthToken(
			req.user,
			req.cookies.refresh_token,
		);
		cookieHandler(res, genToken, false);
	}

	@Get('/refresh')
	@UseGuards(RefreshGuard)
	async refresh(@Request() req, @Response() res) {
		const genToken = await this.authService.refreshAuthToken(
			req.user,
			req.cookies.refresh_token,
		);

		cookieHandler(res, genToken, false);
	}

	@Get('/logout')
	async logout(@Response() res) {
		res.clearCookie('access_token');
		res.clearCookie('refresh_token');

		res.redirect(process.env.CLIENT_REDIRECT_URI);
	}
}
