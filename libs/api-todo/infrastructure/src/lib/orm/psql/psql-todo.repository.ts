import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTodoCommand, TodoRepository, UpdateTodoCommand } from '@wjanaszek/api-todo/application';
import { TodoUid } from '@wjanaszek/api-todo/domain';
import { Repository } from 'typeorm';
import { PsqlTodoEntity } from './psql-todo.entity';

@Injectable()
export class PsqlTodoRepository implements TodoRepository {
  constructor(
    @InjectRepository(PsqlTodoEntity)
    private readonly todoRepository: Repository<PsqlTodoEntity>
  ) {}

  async create(data: CreateTodoCommand): Promise<PsqlTodoEntity> {
    return this.todoRepository.create(data);
  }

  async delete(id: TodoUid): Promise<void> {
    const toRemove = await this.findById(id);

    return new Promise((resolve, reject) => {
      if (!toRemove) {
        reject(id);
      }

      this.todoRepository
        .remove([toRemove as PsqlTodoEntity])
        .then(() => resolve());
    });
  }

  async findAll(): Promise<PsqlTodoEntity[]> {
    return this.todoRepository.find();
  }

  async findById(id: TodoUid): Promise<PsqlTodoEntity | undefined> {
    return this.todoRepository.findOne(id);
  }

  async update(data: UpdateTodoCommand): Promise<PsqlTodoEntity> {
    const toUpdate = await this.findById(data.uid);

    return new Promise((resolve, reject) => {
      if (!toUpdate) {
        reject(data);
      }

      resolve(this.todoRepository.save({ ...toUpdate, ...data }));
    });
  }
}
