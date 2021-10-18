import { ResetPasswordCommandHandler } from './reset-password/reset-password.command-handler';
import { SetPasswordCommandHandler } from './set-password/set-password.command-handler';
import { SignUpUserCommandHandler } from './sign-up/sign-up-user.command-handler';

export const CommandHandlers = [
  ResetPasswordCommandHandler,
  SetPasswordCommandHandler,
  SignUpUserCommandHandler,
];
