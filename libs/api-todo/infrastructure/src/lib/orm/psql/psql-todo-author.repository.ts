import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoAuthorRepository } from '@wjanaszek/api-todo/application';
import { TodoAuthorEntity, TodoId } from '@wjanaszek/api-todo/domain';
import { Repository } from 'typeorm';
import { PsqlTodoAuthorEntity } from './psql-todo-author.entity';

@Injectable()
export class PsqlTodoAuthorRepository implements TodoAuthorRepository {
  constructor(
    @InjectRepository(PsqlTodoAuthorEntity)
    private readonly todoAuthorRepository: Repository<PsqlTodoAuthorEntity>
  ) {}

  async create(author: TodoAuthorEntity): Promise<void> {
    await this.todoAuthorRepository.save(author);
  }

  async findById(id: TodoId): Promise<TodoAuthorEntity | undefined> {
    return this.todoAuthorRepository.findOne(id);
  }
}
