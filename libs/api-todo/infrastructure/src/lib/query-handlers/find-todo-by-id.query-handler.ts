import { ICommandHandler, QueryHandler } from '@nestjs/cqrs';
import { FindTodoByIdQuery, TodoRepository } from '@wjanaszek/api-todo/application';
import { TodoEntity } from '@wjanaszek/api-todo/domain';

@QueryHandler(FindTodoByIdQuery)
export class FindTodoByIdQueryHandler
  implements ICommandHandler<FindTodoByIdQuery, TodoEntity | undefined>
{
  constructor(private readonly todoRepository: TodoRepository) {}

  execute(query: FindTodoByIdQuery): Promise<TodoEntity | undefined> {
    return this.todoRepository.findById(query.uid);
  }
}
