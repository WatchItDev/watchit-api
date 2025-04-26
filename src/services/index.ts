import { ProfileService } from './profile';
import { PostService }    from './posts';

export const Services = ({ ds, ext }: { ds: any; ext: any }) => ({
    Profile:  new ProfileService({ ds, ext }),
    Posts:    new PostService({ ds, ext }),
});

export type ServicesType = ReturnType<typeof Services>;
