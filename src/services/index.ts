import { ProfileService } from './profile';
import { PostService }    from './posts';
import { CommentService } from './comments';
import { SocialService }  from './social';
import { FeedsService }   from './feeds';
import { XPService }   from './xp';

export const Services = ({ ds, ext }: { ds: any; ext: any }) => ({
    Profile:  new ProfileService({ ds, ext }),
    Posts:    new PostService({ ds, ext }),
    Comments: new CommentService({ ds, ext }),
    Social:   new SocialService({ ds, ext }),
    Feeds:    new FeedsService({ ds, ext }),
    XP:       new XPService({ ds, ext }),
});

export type ServicesType = ReturnType<typeof Services>;
