import { RemoveUserCommandHandler } from './remove-user/remove-user.command-handler';
import { ResetPasswordCommandHandler } from './reset-password/reset-password.command-handler';
import { SetPasswordCommandHandler } from './set-password/set-password.command-handler';
import { SignUpUserCommandHandler } from './sign-up/sign-up-user.command-handler';

export const CommandHandlers = [
  RemoveUserCommandHandler,
  ResetPasswordCommandHandler,
  SetPasswordCommandHandler,
  SignUpUserCommandHandler,
];
