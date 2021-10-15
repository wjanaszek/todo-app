import { Injectable } from '@nestjs/common';
import { AuthUserEntity, AuthUserValidation } from '@wjanaszek/api-auth/domain';
import { DomainError, DomainErrorType } from '@wjanaszek/shared/domain';

@Injectable()
export class AuthUserValidationDomainService {
  validate({
    email,
    username,
  }: Pick<AuthUserEntity, 'email' | 'username'>): void {
    if (email.length < AuthUserValidation.email.minLength) {
      throw new DomainError()
        .withType(DomainErrorType.VALIDATION)
        .withMessage(
          `Min length for email field is ${AuthUserValidation.email.minLength}`
        );
    }

    if (email.length > AuthUserValidation.email.maxLength) {
      throw new DomainError()
        .withType(DomainErrorType.VALIDATION)
        .withMessage(
          `Max length for email field is ${AuthUserValidation.email.maxLength}`
        );
    }

    if (username.length < AuthUserValidation.username.minLength) {
      throw new DomainError()
        .withType(DomainErrorType.VALIDATION)
        .withMessage(
          `Min length for username field is ${AuthUserValidation.username.minLength}`
        );
    }

    if (username.length > AuthUserValidation.username.maxLength) {
      throw new DomainError()
        .withType(DomainErrorType.VALIDATION)
        .withMessage(
          `Max length for username field is ${AuthUserValidation.username.maxLength}`
        );
    }
  }
}
