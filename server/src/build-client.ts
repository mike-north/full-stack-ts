import { CLIENT_ROOT_FOLDER } from './constants';
import * as execa from 'execa';

console.log('Found client workspace folder: ' + CLIENT_ROOT_FOLDER);

export function watchClientBuild() {
  execa.execaCommand('yarn dev', {
    cwd: CLIENT_ROOT_FOLDER,
    stdio: 'inherit',
  });
}
