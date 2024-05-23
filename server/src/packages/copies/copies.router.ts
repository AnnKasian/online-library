import { Router } from 'express';

import { ApiRoute } from '@/libs/enums';

import { BooksRouter } from '../books';
import { UsersRouter } from '../user';
import { CopiesController } from './copies.controller';
import { CopiesRepository } from './copies.repository';
import { CopiesService } from './copies.service';
import { CopyReturnSearchStrategy } from './copy-return-search.strategy';
import { CopySearchStrategy } from './libs/types';

class CopiesRouter {
  static readonly ROUTE = ApiRoute.COPIES;

  private router: Router;
  private repository: CopiesRepository;
  private strategy: CopySearchStrategy;
  private controller: CopiesController;
  private service: CopiesService;

  constructor(usersRouter: UsersRouter, booksRouter: BooksRouter) {
    this.router = Router();

    this.repository = new CopiesRepository();
    this.strategy = new CopyReturnSearchStrategy(this.repository);
    this.service = new CopiesService(
      this.repository,
      this.strategy,
      booksRouter.modules.service,
    );
    this.controller = new CopiesController(
      this.router,
      this.service,
      booksRouter.modules.service,
      usersRouter.modules.service,
    );
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

export { CopiesRouter };
