import { ProfileService } from './profile';
import {DataSourcesType} from "@/datasources";
import type * as Externals   from '@/externals';

export const Services = (params: {
    ds:  DataSourcesType;
    ext: typeof Externals;
}) => ({
    Profile: new ProfileService(params),
});
