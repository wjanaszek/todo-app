import { DomainErrorType } from './domain-error-type.enum';

export class DomainError {
  type = DomainErrorType.UNKNOWN;
  message?: string;

  withType(type: DomainErrorType): DomainError {
    this.type = type;
    return this;
  }

  withMessage(message: string): DomainError {
    this.message = message;
    return this;
  }
}
