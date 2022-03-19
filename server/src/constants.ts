import { join } from 'path';
import { pkgUpSync } from 'pkg-up';

export const SERVER_WORKSPACE_PKG_JSON_PATH = pkgUpSync();
if (!SERVER_WORKSPACE_PKG_JSON_PATH) throw new Error('package.json path could not be found');

export const CLIENT_ROOT_FOLDER = join(SERVER_WORKSPACE_PKG_JSON_PATH, '..', '..', 'client');
