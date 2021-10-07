import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  TodoApplicationService,
  TodoReadModel,
} from '@wjanaszek/api-todo/application';
import { TodoUid } from '@wjanaszek/api-todo/domain';
import {
  CreateTodoDto,
  UpdateTodoDto,
} from '@wjanaszek/api-todo/infrastructure';
import {
  ApplicationError,
  ApplicationErrorType,
} from '@wjanaszek/shared/application';
import { HttpNotFoundException } from '@wjanaszek/shared/infrastructure';

@Controller(RestApiTodoController.URI)
export class RestApiTodoController {
  static readonly URI = 'todos';

  constructor(private readonly todoApplicationService: TodoApplicationService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateTodoDto): Promise<void> {
    try {
      return await this.todoApplicationService.create(dto);
    } catch (error) {
      if (
        error instanceof ApplicationError &&
        error.type === ApplicationErrorType.VALIDATION
      ) {
        throw new BadRequestException(error.message);
      }

      throw new InternalServerErrorException();
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: TodoUid): Promise<void> {
    try {
      return await this.todoApplicationService.delete(id);
    } catch (error) {
      if (
        error instanceof ApplicationError &&
        error?.type === ApplicationErrorType.NOT_FOUND
      ) {
        throw HttpNotFoundException.withId(id);
      }

      throw new InternalServerErrorException();
    }
  }

  @Get()
  findAll(): Promise<TodoReadModel[]> {
    return this.todoApplicationService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: TodoUid): Promise<TodoReadModel | null> {
    try {
      return await this.todoApplicationService.findById(id);
    } catch (error) {
      if (
        error instanceof ApplicationError &&
        error.type === ApplicationErrorType.NOT_FOUND
      ) {
        throw HttpNotFoundException.withId(id);
      }

      throw new InternalServerErrorException();
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: TodoUid,
    @Body() dto: Partial<UpdateTodoDto>
  ): Promise<TodoReadModel> {
    try {
      return await this.todoApplicationService.update(id, dto);
    } catch (error) {
      if (error instanceof ApplicationError) {
        if (error.type === ApplicationErrorType.NOT_FOUND) {
          throw HttpNotFoundException.withId(id);
        }

        if (error.type === ApplicationErrorType.VALIDATION) {
          throw new BadRequestException(error.message);
        }
      }

      throw new InternalServerErrorException();
    }
  }
}
