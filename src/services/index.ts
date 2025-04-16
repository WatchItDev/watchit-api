import { ProfileService } from './profile'

export const Services = (context: GQL.ContextType) => {
    return {
        Profile: new ProfileService(context),
    }
}