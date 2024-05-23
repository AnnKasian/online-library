import bodyParser from 'body-parser';
import cors from 'cors';
import { config } from 'dotenv';
import express, { Router } from 'express';

import { handleAuth, handleError } from '#/libs/middlewares';
import { UserApiRoute } from '#/packages/user';
import { createRouters } from '#/routers';
import { ConfigService } from '#/services/config';
import { ConsoleLoggerService, LoggerPublisher } from '#/services/logger';
import { PrismaService } from '#/services/prisma';

config();

const app = express();
const router = Router();

const consoleLoggerService = new ConsoleLoggerService();
const loggerPublisher = new LoggerPublisher([consoleLoggerService]);
const configService = ConfigService.instance;
await PrismaService.connect();

const {
  app: { prefixGlobal },
} = configService.schema;

const [useRoutes, { usersRouter }] = createRouters();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.json(), bodyParser.urlencoded({ extended: false }));
app.use(
  handleAuth(
    { usersService: usersRouter.modules.service },
    {
      omitRoutes: [UserApiRoute.SIGN_IN, UserApiRoute.SIGN_UP],
    },
  ),
);
app.use(`/${prefixGlobal}`, router);
useRoutes(router);
app.use(handleError(loggerPublisher));

app.listen(configService.schema.app.port, () => {
  loggerPublisher.info(
    `Listening to the port: ${configService.schema.app.port}`,
  );
});
