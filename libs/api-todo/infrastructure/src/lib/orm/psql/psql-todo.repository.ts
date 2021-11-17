import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateTodoCommand,
  TodoRepository,
  UpdateTodoCommand,
} from '@wjanaszek/api-todo/application';
import { TodoAuthorId, TodoEntity, TodoId } from '@wjanaszek/api-todo/domain';
import { Repository } from 'typeorm';
import { PsqlTodoAuthorEntity } from './psql-todo-author.entity';
import { PsqlTodoEntity } from './psql-todo.entity';

@Injectable()
export class PsqlTodoRepository implements TodoRepository {
  constructor(
    @InjectRepository(PsqlTodoAuthorEntity)
    private readonly authorRepository: Repository<PsqlTodoAuthorEntity>,
    @InjectRepository(PsqlTodoEntity)
    private readonly todoRepository: Repository<PsqlTodoEntity>
  ) {}

  async create(data: CreateTodoCommand): Promise<TodoEntity> {
    const author = await this.authorRepository.findOne({ id: data.authorId });

    if (!author) {
      throw new Error(`Author ${data.authorId} not found!`);
    }

    const todo = await this.todoRepository.create({ ...data, author });
    return this.todoRepository.save(todo);
  }

  async delete(id: TodoId, authorId: TodoAuthorId): Promise<void> {
    const toRemove = await this.findById(id, authorId);

    if (!toRemove) {
      throw new Error(`ToDo ${id} not found!`);
    }

    await this.todoRepository.remove([toRemove as PsqlTodoEntity]);
  }

  async findAll(authorId: TodoAuthorId): Promise<TodoEntity[]> {
    const author = await this.authorRepository.findOne({ id: authorId });

    if (!author) {
      throw new Error(`Author ${authorId} not found!`);
    }

    return this.todoRepository.find({ author });
  }

  async findById(
    id: TodoId,
    authorId: TodoAuthorId
  ): Promise<TodoEntity | undefined> {
    const author = await this.authorRepository.findOne({ id: authorId });

    if (!author) {
      throw new Error(`Author ${authorId} not found!`);
    }

    return this.todoRepository.findOne({ id, author });
  }

  async update(data: UpdateTodoCommand): Promise<TodoEntity> {
    const toUpdate = await this.findById(data.id, data.authorId);

    if (!toUpdate) {
      throw new Error(`ToDo ${data.id} not found!`);
    }

    return this.todoRepository.save({
      ...toUpdate,
      name: data.name ?? toUpdate.name,
      status: data.status ?? toUpdate.status,
    });
  }
}
