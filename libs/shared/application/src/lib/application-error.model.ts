import { ApplicationErrorType } from './application-error-type.enum';

export class ApplicationError {
  type = ApplicationErrorType.UNKNOWN;
  message?: string;

  withType(type: ApplicationErrorType): ApplicationError {
    this.type = type;
    return this;
  }

  withMessage(message: string): ApplicationError {
    this.message = message;
    return this;
  }
}
