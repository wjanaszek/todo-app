import { NotFoundException } from '@nestjs/common';
import { EntityUid } from '@wjanaszek/shared/domain';

export class HttpNotFoundException {
  static withId(id: EntityUid): NotFoundException {
    return new NotFoundException({ message: `Entity with id ${id} not found` });
  }
}
