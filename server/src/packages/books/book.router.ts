import { Router } from 'express';

import { ApiRoute } from '@/libs/enums';

import { BooksController } from './book.controller';
import { BooksRepository } from './book.repository';
import { BooksService } from './book.service';

class BooksRouter {
  static readonly ROUTE = ApiRoute.BOOKS;

  private router: Router;
  private repository: BooksRepository;
  private controller: BooksController;
  private service: BooksService;

  constructor() {
    this.router = Router();

    this.repository = new BooksRepository();
    this.service = new BooksService(this.repository);
    this.controller = new BooksController(this.router, this.service);
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

export { BooksRouter };
