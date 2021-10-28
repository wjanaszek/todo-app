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
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '@wjanaszek/api-auth/application';
import { TodoApplicationService } from '@wjanaszek/api-todo/application';
import { TodoId } from '@wjanaszek/api-todo/domain';
import {
  CreateTodoDto,
  TodoDto,
  UpdateTodoDto,
} from '@wjanaszek/api-todo/infrastructure';
import {
  ApplicationError,
  ApplicationErrorType,
} from '@wjanaszek/shared/application';
import {
  HttpNotFoundException,
  JwtRequest,
} from '@wjanaszek/shared/infrastructure';

@UseGuards(JwtAuthGuard)
@Controller(RestApiTodoController.URI)
export class RestApiTodoController {
  static readonly URI = 'todos';

  constructor(
    private readonly todoApplicationService: TodoApplicationService
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() dto: CreateTodoDto,
    @Req() request: JwtRequest
  ): Promise<void> {
    try {
      return this.todoApplicationService.create({
        ...dto,
        authorId: request.user.id,
      });
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
  async delete(
    @Param('id') id: TodoId,
    @Req() request: JwtRequest
  ): Promise<void> {
    try {
      return await this.todoApplicationService.delete(id, request.user.id);
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
  findAll(@Req() request: JwtRequest): Promise<TodoDto[]> {
    return this.todoApplicationService.findAll(request.user.id);
  }

  @Get(':id')
  async findById(
    @Param('id') id: TodoId,
    @Req() request: JwtRequest
  ): Promise<TodoDto | null> {
    try {
      return await this.todoApplicationService.findById(id, request.user.id);
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
   * @param request
   */
  @Put(':id')
  async update(
    @Param('id') id: TodoId,
    @Body() dto: UpdateTodoDto,
    @Req() request: JwtRequest
  ): Promise<TodoDto> {
    try {
      return await this.todoApplicationService.update(id, request.user.id, dto);
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
