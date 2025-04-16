import { ProfileService } from './profile'

export const Services = (context)=> {
    return {
        Profile: new ProfileService(context),
    }
}