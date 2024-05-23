import { Router } from 'express';

import { ApiRoute } from '@/libs/enums';

import { AuthProxy } from './auth.proxy';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';

class UsersRouter {
  static readonly ROUTE = ApiRoute.USERS;

  private router: Router;
  private repository: UsersRepository;
  private controller: UsersController;
  private service: UsersService;

  constructor() {
    this.router = Router();

    this.repository = new UsersRepository();
    this.service = new AuthProxy(this.repository);
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
