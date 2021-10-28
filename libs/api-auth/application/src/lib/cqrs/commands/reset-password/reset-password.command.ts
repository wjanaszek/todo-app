import { ICommand } from '@nestjs/cqrs';

export class ResetPasswordCommand implements ICommand {
  constructor(public readonly userEmail: string) {}
}
