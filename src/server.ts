import * as helmet from 'helmet';
import { getLogger } from '@lib';
import { StoreKeys } from '@common';
import { CoreModule } from '@modules';
import { getConfigs } from '@configs';
import { NestFactory } from '@nestjs/core';
import { Filter, Interceptor, StoreModule, StoreProvider } from '@sophons/nest-tools';

/**
 * Start and bind the IOC module and the Global Store
 */
export const createServer = async () => {
  /**
   * Initialize server application.
   */
  const app = await NestFactory.create(CoreModule, { cors: true, bodyParser: false });

  /**
   * `select(StoreModule).get`, just like a query, automatically searches for instances in each registration module.
   *
   * Here, we want to use a more restrictive retrieval mode.
   * so we pass the `{ strict: true }` option object as the second argument to the get() method.
   * You can then select a specific instance from the selected context.
   */
  const libStore: StoreProvider<StoreKeys> = app.select(StoreModule).get(StoreProvider, { strict: true });

  /**
   * Initialize the store.
   */
  const logger = await getLogger();
  const configs = await getConfigs();
  libStore.save('logger', await getLogger());
  libStore.save('configs', await getConfigs());

  /**
   * Initialize the server application middleware and aop handler.
   */
  app.use(helmet());
  app.useGlobalInterceptors(new Interceptor.RequestId(logger));
  app.useGlobalFilters(new Filter.RequestError(logger));

  await app.listen(configs.port);
  logger.info(`[${configs.appname}]: SERVER START WITH ${configs.env} - ${configs.port}`);
};
