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
  Put
} from '@nestjs/common';
import { TodoApplicationService } from '@wjanaszek/api-todo/application';
import { TodoId } from '@wjanaszek/api-todo/domain';
import { CreateTodoDto, TodoDto, UpdateTodoDto } from '@wjanaszek/api-todo/infrastructure';
import { ApplicationError, ApplicationErrorType } from '@wjanaszek/shared/application';
import { HttpNotFoundException } from '@wjanaszek/shared/infrastructure';

@Controller(RestApiTodoController.URI)
export class RestApiTodoController {
  static readonly URI = 'todos';

  constructor(
    private readonly todoApplicationService: TodoApplicationService
  ) {}

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
  async delete(@Param('id') id: TodoId): Promise<void> {
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
  findAll(): Promise<TodoDto[]> {
    return this.todoApplicationService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: TodoId): Promise<TodoDto | null> {
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

  /**
   * Update a ToDo
   * @param id entity uuid
   * @param dto
   */
  @Put(':id')
  async update(
    @Param('id') id: TodoId,
    @Body() dto: UpdateTodoDto
  ): Promise<TodoDto> {
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
