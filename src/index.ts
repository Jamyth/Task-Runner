import yargs from 'yargs';
import { createConsoleLogger } from '@iamyth/logger';

interface Task {
    name: string;
    execute: () => void | PromiseLike<void>;
    skipInFastMode?: boolean;
}

export class TaskRunner {
    private readonly logger = createConsoleLogger(this.taskName);
    private readonly isFastMode = String((yargs.argv as any).mode) === 'fast';

    constructor(private readonly taskName: string) {}

    execute(tasks: Task[]) {
        this.executeAsync(tasks)
            .then(() => {
                this.logger.info('All tasks done !');
            })
            .catch((error) => {
                this.logger.error(error);
                process.exit(1);
            });
    }

    private async executeAsync(tasks: Task[]) {
        for await (const { name, execute, skipInFastMode } of tasks) {
            if (!this.isFastMode || !skipInFastMode) {
                this.logger.task(name);
                await execute();
            }
        }
    }
}
