import { watchClientBuild } from './build-client';
import * as shared from '@full-stack-ts/shared';

const { sub } = shared

async function main() {
  console.log('Attempting to build and serve web UI on http://localhost:1234');
  console.log('subtraction test', sub(1, 2));
  watchClientBuild();
}

main();
