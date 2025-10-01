import { CommentService } from './comment/service';
import { EdgeService } from './edge/service';
import { PostService } from './post/service';
import { Context } from './types';
import { UsersService } from './user/service';

export const Services = (arg: Context) => ({
  User: UsersService(arg),
  Post: PostService(arg),
  Comment: CommentService(arg),
  Edge: EdgeService(arg),
});
