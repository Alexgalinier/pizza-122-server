import * as server from './shared/server';
import log from './hooks/log';
import accessControl from './hooks/access-control';
import config from './config';
import * as Auth from './shared/auth';
import * as Encrypt from './shared/encrypt';
import Database from './shared/db';
// Routes
import login from './routes/login';
import users from './routes/users';
import orders from './routes/orders';
import pizzas from './routes/pizzas';

(async () => {
  const { auth, encrypt, web, database } = config;

  Auth.config(auth);
  Encrypt.config(encrypt);

  server.before(log);
  server.before(accessControl(web.headerOrigin));

  server.config({
    db: await Database(database),
    maxUsersCount: database.maxUsersCount
  });
  server.routes(login);
  server.routes(users);
  server.routes(orders);
  server.routes(pizzas);

  server.start(web.port);
})();
