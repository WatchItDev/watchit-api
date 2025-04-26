import { ProfileService } from './profile';
import { PostService }    from './posts';
import { CommentService } from './comments';

export const Services = ({ ds, ext }: { ds: any; ext: any }) => ({
    Profile:  new ProfileService({ ds, ext }),
    Posts:    new PostService({ ds, ext }),
    Comments: new CommentService({ ds, ext }),
});

export type ServicesType = ReturnType<typeof Services>;
