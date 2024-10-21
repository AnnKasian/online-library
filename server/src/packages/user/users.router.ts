import { Router } from 'express';

import { ApiRoute } from '@/libs/enums';

import { AuthProxy } from './auth.proxy';
import { UsersGenericService } from './libs/types';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';

class UsersRouter {
  static readonly ROUTE = ApiRoute.USERS;

  private router: Router;
  private repository: UsersRepository;
  private controller: UsersController;
  private service: UsersGenericService;

  constructor() {
    this.router = Router();

    this.repository = new UsersRepository();
    const usersService = new UsersService(this.repository);
    this.service = new AuthProxy(usersService);
    this.controller = new UsersController(this.router, this.service);
  }

  get instance() {
    return this.router;
  }

  get modules() {
    return {
      repository: this.repository,
      service: this.service,
    };
  }

  useRoutes() {
    this.controller.useRoutes();
  }
}

export { UsersRouter };
