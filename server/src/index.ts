import * as chalk from 'chalk';
import * as express from 'express';
import { watchClientBuild } from './build-client';
import { DB_FILE_PATH, PORT, STATIC_ROOT_FOLDER_PATH } from './constants';
import Db from './db';
import { seedDb } from './seed';
import { createApolloServer } from "./apollo-server"
import { createServer } from "http"

const app = express();

async function main() {
  console.log(
    [
      chalk.bgBlueBright.white.bold(' Building UI and serving on '),
      chalk.bgWhite.black('\thttp://localhost:1234\t\t'),
    ].join(' ')
  );
  watchClientBuild();
  const db = new Db(DB_FILE_PATH);
  await db.initDefaults();
  await seedDb(db);

  app.use('/static', express.static(STATIC_ROOT_FOLDER_PATH));
  const httpServer = createServer(app)
  const apolloServer = await createApolloServer(
    db,
    httpServer,
    app
)


  await new Promise<void>((resolve) =>
    app.listen(PORT, () => {
      console.log(
        [
          chalk.bgMagentaBright.black.bold(' GraphQL API listening on   '),
          //chalk.bgWhite.black(`\thttp://localhost:${PORT}${''}\t`),
          chalk.bgWhite.black(`\thttp://localhost:${PORT}${apolloServer.graphqlPath}\t`), 
        ].join(' ')
      );
      resolve();
    })
  );
}

main().catch((err) => {
  console.error(err);
});
