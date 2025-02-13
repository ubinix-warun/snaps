import {
  ThreadParentMessageStream,
  BasePostMessageStream,
} from '@metamask/post-message-stream';
// eslint-disable-next-line @typescript-eslint/no-shadow
import { Worker } from 'worker_threads';

import { AbstractExecutionService, Job } from '..';

export class NodeThreadExecutionService extends AbstractExecutionService<Worker> {
  protected async initEnvStream(): Promise<{
    worker: Worker;
    stream: BasePostMessageStream;
  }> {
    const worker = new Worker(
      require.resolve(
        'navh-metamask-snaps-execution-environments/dist/browserify/node-thread/bundle.js',
      ),
    );
    const stream = new ThreadParentMessageStream({ thread: worker });
    return Promise.resolve({ worker, stream });
  }

  protected async terminateJob(jobWrapper: Job<Worker>): Promise<void> {
    await jobWrapper.worker.terminate();
  }
}
