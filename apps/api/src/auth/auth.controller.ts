import { Controller, Get, Request, Response, UseGuards } from '@nestjs/common';
import { GithubAuthGuard } from './guards/github-oauth.guard';
import { AuthService } from './auth.service';
import { cookieHandler } from './cookieHandler';

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

        cookieHandler(res, authToken);
    }
}
