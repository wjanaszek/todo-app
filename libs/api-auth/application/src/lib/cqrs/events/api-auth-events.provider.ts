import { ResetPasswordTokenGeneratedEventHandler } from './reset-password/reset-password-token-generated.event-handler';
import { NewPasswordSetEventHandler } from './set-password/new-password-set.event-handler';

export const EventHandlers = [
  ResetPasswordTokenGeneratedEventHandler,
  NewPasswordSetEventHandler,
];
