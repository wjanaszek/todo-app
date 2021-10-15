import { Module } from '@nestjs/common';
import { AuthUserValidationDomainService } from './auth-user-validation.domain-service';

@Module({
  providers: [AuthUserValidationDomainService],
  exports: [AuthUserValidationDomainService],
})
export class AuthUserDomainModule {}
