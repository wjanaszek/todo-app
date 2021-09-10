import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { TodoEntity } from '@wjanaszek/api-todo/domain';
import { TodoRepository } from '../../todo.repository';
import { FindAllTodoQuery } from './find-all-todo.query';

@QueryHandler(FindAllTodoQuery)
export class FindAllTodoQueryHandler
  implements IQueryHandler<FindAllTodoQuery, TodoEntity[]>
{
  constructor(private readonly todoRepository: TodoRepository) {}

  execute(query: FindAllTodoQuery): Promise<TodoEntity[]> {
    // @TODO check why repository should not be used for queries
    return this.todoRepository.findAll();
  }
}
