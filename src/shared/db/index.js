import * as memoryDB from './db-memory';
import * as mongoDB from './db-mongo';

export default async ({ user, password, name }) => {
  let db;

  if (user && password && name) {
    try {
      db = mongoDB;
      await db.connect(
        `mongodb://${user}:${password}@ds111390.mlab.com:11390/${name}`,
        name
      );
    } catch (e) {
      console.error(e);
      throw new Error('Database failed to start');
    }
  } else {
    db = memoryDB;
  }

  return db;
};
