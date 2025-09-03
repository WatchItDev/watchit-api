import { ServiceManager } from "./manager";
import type { User, Post } from "@/schema/types";

export class FeedsService extends ServiceManager {
  popularUsers(limit?: number): Promise<User[]> {
    return this.ds.Feeds.popularUsers(limit);
  }
  recentUsers(limit?: number): Promise<User[]> {
    return this.ds.Feeds.recentUsers(limit);
  }
  activeUsers(limit?: number): Promise<User[]> {
    return this.ds.Feeds.activeUsers(limit);
  }

  popularPosts(limit?: number): Promise<Post[]> {
    return this.ds.Feeds.popularPosts(limit);
  }
  recentPosts(limit?: number): Promise<Post[]> {
    return this.ds.Feeds.recentPosts(limit);
  }
  allPosts(limit?: number): Promise<Post[]> {
    return this.ds.Feeds.allPosts(limit);
  }
}
