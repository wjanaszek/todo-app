import { HttpStatus } from '@nestjs/common';
import { AuthUserRepository } from '@wjanaszek/api-auth/application';
import {
  TodoAuthorRepository,
  TodoRepository,
} from '@wjanaszek/api-todo/application';
import { TodoId, TodoStatus } from '@wjanaszek/api-todo/domain';
import { CreateTodoDto } from '@wjanaszek/api-todo/infrastructure';
import { EntityUid } from '@wjanaszek/shared/domain';
import * as request from 'supertest';
import { Response } from 'supertest';
import { v4 as uuidv4 } from 'uuid';
import { AccessToken } from '../../types/access-token.type';
import { initApplication } from '../../utils/application-initializer';
import { Authenticate } from '../../utils/authenticate';

const credentials = {
  email: 'aftersignup@test.pl',
  username: 'testaftersignup',
  password: 'Qwe12345!',
};
const todo = {
  id: uuidv4(),
  name: 'test name',
  status: TodoStatus.IN_PROGRESS,
};

export const getFixtures = async () => {
  const app = await initApplication();
  const userRepository = app.get(AuthUserRepository);
  const todoAuthorRepository = app.get(TodoAuthorRepository);
  const todoRepository = app.get(TodoRepository);
  let accessToken: AccessToken;
  let userId: EntityUid;

  return {
    cleanup: async () => {
      await userRepository.remove(credentials.email);
      await todoRepository.delete(todo.id, userId);
      await app.close();
    },
    GivenUserIsCreatedAndLoggedIn: async (): Promise<void> => {
      userId = (await userRepository.signUp(credentials)).id;
      await todoAuthorRepository.create({ id: userId, todos: [] });
      accessToken = await Authenticate(app, credentials);
    },
    GivenCreateToDoRequest: (): CreateTodoDto => {
      return {
        id: todo.id,
        name: todo.name,
        status: todo.status,
      };
    },
    WhenCreatingToDo: async (contract: CreateTodoDto): Promise<Response> => {
      return request(app.getHttpServer())
        .post('/api/todos')
        .set('Authorization', `Bearer ${accessToken}`)
        .send(contract);
    },
    ThenToDoIsCreated: (response: Response): void => {
      expect(response.status).toBe(HttpStatus.CREATED);
    },
    ThenToDoIsReturnedInTheList: async (id: TodoId): Promise<void> => {
      const todoList = await request(app.getHttpServer())
        .get('/api/todos')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(HttpStatus.OK);

      expect(todoList.body.find((todo) => todo.id === id)).toBeTruthy();
    },
  };
};
