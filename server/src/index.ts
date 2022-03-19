import { watchClientBuild } from './build-client';
import Db from './db';
import { DB_FILE_PATH, PORT, STATIC_ROOT_FOLDER_PATH } from './constants';
import { seedDb } from './seed';
import express from 'express';

const app = express();

async function main() {
  console.log('Attempting to build and serve web UI on http://localhost:1234');
  watchClientBuild();
  const db = new Db(DB_FILE_PATH);
  if (db.getAllUsers().length === 0) {
    seedDb(db);
  }

  app.use('/static', express.static(STATIC_ROOT_FOLDER_PATH));
  app.listen(PORT, () => {
    console.log(`API Listening on http://localhost:${PORT}`);
  });
}

main();
