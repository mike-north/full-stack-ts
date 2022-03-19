import { watchClientBuild } from './build-client';

async function main() {
  console.log("Attempting to build and serve web UI on http://localhost:1234");
  watchClientBuild();
}

main();
