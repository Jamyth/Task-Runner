# Task Runner

## Description

A simple utility class for writing your (async) tasks, and it will be executed sequentially.

## Installation

```bash
> npm install -DE @iamyth/task-runner
# or
> yarn add -DE @iamyth/task-runner
```

## Example

```ts
// build.ts

import { TaskRunner } from '@iamyth/task-runner';

new TaskRunner('My Awesome Task').execute([
    {
        name: 'Prettier',
        execute: () => {
            // Prettier Checking
        },
        skipInFastMode: true, // This Task will not be ran in fast mode
    },
    {
        name: 'Prepare Folder',
        execute: () => {
            fs.mkdirSync('my-dest-folder');
        },
    },
    {
        name: 'tsc',
        execute: () => {
            child_process.spawnSync('tsc', ...rest);
        },
    },
]);
```

```bash
ts-node --project tsconfig.json build.ts
# or Run in fast mode
ts-node --project tsconfig.json build.ts --mode fast
```
