import { TruncatedSnap } from 'navh-metamask-snaps-utils';

export const getRunnableSnaps = <T extends TruncatedSnap>(snaps: T[]) =>
  snaps.filter((snap) => snap.enabled && !snap.blocked);
