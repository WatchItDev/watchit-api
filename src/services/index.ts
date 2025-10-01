import { CommentService } from './comment';
import { PostService } from './post';
import { UsersService } from './user';

import { LogService } from './logs';
import { EdgeService } from './edge';

export const Services = ({ ds, ext }: { ds: any; ext: any }) => ({
  User: new UsersService({ ds, ext }),
  Post: new PostService({ ds, ext }),
  Comment: new CommentService({ ds, ext }),
  Edge: new EdgeService({ ds, ext }),
  Logs: new LogService({ ds, ext }),
});

export type ServicesType = ReturnType<typeof Services>;
