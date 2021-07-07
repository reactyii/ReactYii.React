import 'isomorphic-fetch';
import { Hash } from './commonModels';
export interface iLoadableItem {
}
export interface iWrapLoadableItem<T> {
    key: string;
    item: T | null;
    loaded?: number;
    abortController: AbortController | null;
    err: string | null;
}
export declare abstract class BaseRepository<T extends iLoadableItem> {
    readonly host: string;
    protected readonly enableCache: boolean;
    protected readonly abortAll: boolean;
    protected readonly data: Hash<iWrapLoadableItem<T>>;
    private abortController;
    get(key: string, get: Hash<string>, end: (item: iWrapLoadableItem<T>) => void): void;
    post(key: string, get: Hash<string>, post: Hash<string | string[]>, end: (item: iWrapLoadableItem<T>) => void): void;
    load(key: string, get: Hash<string>, end: (item: iWrapLoadableItem<T>) => void, method?: string, post?: Hash<string | string[]>): null;
    abstract getTestItem(key: string): T;
    abstract getUrl(key: string, get: Hash<string>): string;
    abstract prepareItemForStore(key: string, item: iWrapLoadableItem<T>): iWrapLoadableItem<T>;
}
