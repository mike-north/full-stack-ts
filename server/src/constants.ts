import { join } from 'path';
import { pkgUpSync } from 'pkg-up';

export const SERVER_WORKSPACE_PKG_JSON_PATH = pkgUpSync();
if (!SERVER_WORKSPACE_PKG_JSON_PATH)
  throw new Error('package.json path could not be found');
export const ROOT_PKG_JSON_PATH = join(
  SERVER_WORKSPACE_PKG_JSON_PATH,
  '..',
  '..'
);

function rootFolderPath(name: string): string {
  return join(ROOT_PKG_JSON_PATH, name);
}

export const CLIENT_ROOT_FOLDER_PATH = rootFolderPath('client');
export const STATIC_ROOT_FOLDER_PATH = rootFolderPath('static');
export const DB_FILE_PATH = join(ROOT_PKG_JSON_PATH, 'db.json');
export const PORT = process.env.PORT || 3000;
