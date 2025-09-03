import { ServiceManager } from "./manager";

export class LogService extends ServiceManager {
  logEvent = (addr: string, payload: any) =>
    this.ds.Logs.logEvent(addr, { ...payload });

  userEvents = (...args: Parameters<typeof this.ds.Logs.eventsByUser>) =>
    this.ds.Logs.eventsByUser(...args);

  targetEvents = (...args: Parameters<typeof this.ds.Logs.eventsByTarget>) =>
    this.ds.Logs.eventsByTarget(...args);

  countPostViews = (postId: string) =>
    this.ds.Logs.countEvents("POST_VIEW", "targetId", postId);

  countProfileViews = (addr: string) =>
    this.ds.Logs.countEvents("PROFILE_VIEW", "targetId", addr);
}
