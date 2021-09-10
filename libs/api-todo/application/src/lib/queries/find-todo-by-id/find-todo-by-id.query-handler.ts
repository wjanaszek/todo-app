import { ICommandHandler, QueryHandler } from '@nestjs/cqrs';
import { TodoEntity } from '@wjanaszek/api-todo/domain';
import { TodoRepository } from '../../todo.repository';
import { FindTodoByIdQuery } from './find-todo-by-id.query';

@QueryHandler(FindTodoByIdQuery)
export class FindTodoByIdQueryHandler
  implements ICommandHandler<FindTodoByIdQuery, TodoEntity | undefined>
{
  constructor(private readonly todoRepository: TodoRepository) {}

  execute(query: FindTodoByIdQuery): Promise<TodoEntity | undefined> {
    return this.todoRepository.findById(query.uid);
  }
}
