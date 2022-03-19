import * as execa from 'execa';
import { join } from 'path';
import { pkgUpSync } from 'pkg-up';

const SERVER_WORKSPACE_PKG_JSON_PATH = pkgUpSync();
if (!SERVER_WORKSPACE_PKG_JSON_PATH) throw new Error('package.json path could not be found');

const CLIENT_ROOT_FOLDER = join(SERVER_WORKSPACE_PKG_JSON_PATH, '..', '..', 'client');
console.log('Found client workspace folder: ' + CLIENT_ROOT_FOLDER);

export function watchClientBuild() {
  execa.execaCommand('yarn dev', {
    cwd: CLIENT_ROOT_FOLDER,
    stdio: 'inherit',
  });
}
