import { HttpStatus } from '@nestjs/common';
import { TodoRepository } from '@wjanaszek/api-todo/application';
import { TodoStatus } from '@wjanaszek/api-todo/domain';
import { UpdateTodoDto } from '@wjanaszek/api-todo/infrastructure';
import * as request from 'supertest';
import { Response } from 'supertest';
import { v4 as uuidv4 } from 'uuid';
import { AccessToken } from '../../types/access-token.type';
import { initApplication } from '../../utils/application-initializer';
import { Authenticate } from '../../utils/authenticate';

const userId = '0bd8d8f2-2cc2-4486-ae11-2571d1f29176';
const credentials = {
  username: 'test',
  password: 'test',
};
const todo = {
  id: uuidv4(),
  name: 'test name',
  status: TodoStatus.IN_PROGRESS,
};
const updatedTodo = {
  ...todo,
  name: 'updated name',
};

export const getFixtures = async () => {
  const app = await initApplication();
  const todoRepository = app.get(TodoRepository);
  let accessToken: AccessToken;

  return {
    cleanup: async () => {
      await todoRepository.delete(todo.id, userId);
      await app.close();
    },
    GivenUserIsLoggedIn: async (): Promise<void> => {
      accessToken = await Authenticate(app, credentials);
    },
    GivenExistingToDo: async (): Promise<void> => {
      await todoRepository.create({ ...todo, authorId: userId });
    },
    GivenUpdateToDoRequest: (): UpdateTodoDto => {
      return {
        name: updatedTodo.name,
      };
    },
    GivenInvalidUpdateToDoRequest: (): UpdateTodoDto => {
      return {
        name: 123 as unknown as string,
      };
    },
    WhenUpdatingToDo: async (contract: UpdateTodoDto): Promise<Response> => {
      return request(app.getHttpServer())
        .put(`/api/todos/${todo.id}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send(contract);
    },
    ThenToDoIsUpdated: (response: Response): void => {
      expect(response.status).toBe(HttpStatus.OK);
      expect(response.body.name).toBe(updatedTodo.name);
    },
    ThenValidationErrorIsReturned: (response: Response): void => {
      expect(response.status).toBe(HttpStatus.BAD_REQUEST);
      expect(response.body.message[0]).toEqual('name must be a string');
    },
  };
};
