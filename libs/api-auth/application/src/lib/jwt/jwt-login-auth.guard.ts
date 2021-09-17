import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtLoginAuthGuard extends AuthGuard('jwt-login') {}
