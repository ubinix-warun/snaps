import {
  WindowPostMessageStream,
  BasePostMessageStream,
} from '@metamask/post-message-stream';
import { createWindow } from 'navh-metamask-snaps-utils';

import {
  Job,
  AbstractExecutionService,
  ExecutionServiceArgs,
} from '../AbstractExecutionService';

type IframeExecutionEnvironmentServiceArgs = {
  iframeUrl: URL;
} & ExecutionServiceArgs;

export class IframeExecutionService extends AbstractExecutionService<Window> {
  public iframeUrl: URL;

  constructor({
    iframeUrl,
    messenger,
    setupSnapProvider,
  }: IframeExecutionEnvironmentServiceArgs) {
    super({
      messenger,
      setupSnapProvider,
    });
    this.iframeUrl = iframeUrl;
  }

  protected terminateJob(jobWrapper: Job<Window>): void {
    document.getElementById(jobWrapper.id)?.remove();
  }

  protected async initEnvStream(jobId: string): Promise<{
    worker: Window;
    stream: BasePostMessageStream;
  }> {
    const iframeWindow = await createWindow(this.iframeUrl.toString(), jobId);

    const stream = new WindowPostMessageStream({
      name: 'parent',
      target: 'child',
      targetWindow: iframeWindow,
      targetOrigin: '*',
    });

    return { worker: iframeWindow, stream };
  }
}
