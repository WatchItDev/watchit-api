import Users from './users';
import Posts from './posts';
import Comments from './comments';
import Interactions from './interactions';

export const DataSources = (store) => ({
    Users: new Users(store),
    Posts: new Posts(store),
    Comments: new Comments(store),
    Interactions: new Interactions(store),
});
