# Full Stack TypeScript [![CI](https://github.com/mike-north/full-stack-ts/actions/workflows/ci.yml/badge.svg)](https://github.com/mike-north/full-stack-ts/actions/workflows/ci.yml)

Mike North's Full Stack TypeScript course

- Video: [Frontend Masters](https://frontendmasters.com/workshops/fullstack-typescript/)
- Course website: [TypeScript Training: Full Stack TypeScript](https://www.typescript-training.com/course/full-stack-typescript)

## Setup

First, if you want to ensure you're using the correct Node.js and package manager versions, [install Volta](http://volta.sh)

```sh
# install Volta
curl https://get.volta.sh | bash

# install Node
volta install node
```

Then, check out a local copy of this repository

```sh
git clone git@github.com:mike-north/full-stack-ts
cd full-stack-typescript
```

Next, install the project dependencies

```sh
yarn
```

Build the project for the first time

```sh
yarn build
```

And finally, start the project

```sh
yarn dev
```

After the client and server build processes complete, you should see an "imitation Twitter" running on [http://localhost:1234](http://localhost:1234).

## Legal

&copy; 2022 Mike North, all rights reserved.
