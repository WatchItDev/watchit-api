// import { DataSourceManager } from '../manager';

// export class ReactionsCommands extends DataSourceManager {

//   like(addr: string, targetId: string, targetType: string) {
//     return this.fs('likes').create(`${addr}_${targetId}`, {
//       targetId,
//       targetType,
//       author: addr,
//       createdAt: Date.now(),
//     });
//   }

//   dislike(addr: string, targetId: string) {
//     return this.fs('likes').delete(`${addr}_${targetId}`);
//   }
// }
