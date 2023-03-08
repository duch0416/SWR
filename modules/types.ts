import type {Key, SWRConfiguration} from 'swr';

export type QueryOptions = SWRConfiguration;
export type Keys<T extends object = {}> = T

export type QueryParams<K extends Keys> = {keys: K, options?: QueryOptions}
export type MutationParams<K extends Keys> = {keys: K, options?: SWRConfiguration}