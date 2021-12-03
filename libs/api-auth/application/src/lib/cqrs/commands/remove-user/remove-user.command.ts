import { ICommand } from '@nestjs/cqrs';

export class RemoveUserCommand implements ICommand {
  constructor(public readonly usernameOrEmail: string) {}
}
