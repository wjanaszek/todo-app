import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoAuthorRepository } from '@wjanaszek/api-todo/application';
import {
  TodoAuthorEntity,
  TodoAuthorId,
  TodoId,
} from '@wjanaszek/api-todo/domain';
import { Repository } from 'typeorm';
import { PsqlTodoAuthorEntity } from './psql-todo-author.entity';
import { PsqlTodoEntity } from './psql-todo.entity';

@Injectable()
export class PsqlTodoAuthorRepository implements TodoAuthorRepository {
  constructor(
    @InjectRepository(PsqlTodoAuthorEntity)
    private readonly authorRepository: Repository<PsqlTodoAuthorEntity>,
    @InjectRepository(PsqlTodoEntity)
    private readonly todoRepository: Repository<PsqlTodoEntity>
  ) {}

  async create(author: TodoAuthorEntity): Promise<void> {
    await this.authorRepository.save(author);
  }

  async findById(id: TodoId): Promise<TodoAuthorEntity | undefined> {
    return this.authorRepository.findOne(id);
  }

  async remove(authorId: TodoAuthorId): Promise<void> {
    const todos = await this.todoRepository.find({
      where: { author: authorId },
    });

    await this.todoRepository.remove(todos);
    await this.authorRepository.delete({ id: authorId });
  }
}
