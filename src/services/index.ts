import { ProfileService } from './profile';

export const Services = ({ ds, ext }) => ({
    Profile: new ProfileService({ ds, ext }),
});
