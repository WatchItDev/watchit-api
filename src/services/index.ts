import { ProfileService } from './profile';
import { FeedService } from './feed';
import { InteractionsService } from './interactions';

export const Services = ({ ds, ext }) => ({
    Profile: new ProfileService({ ds, ext }),
    Feed: new FeedService({ ds, ext }),
    Interactions: new InteractionsService({ ds, ext }),
});
