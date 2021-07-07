import { BaseRepository, iWrapLoadableItem } from "./baseRepository";
import { Hash } from "./commonModels";
import { iPage } from './pageModels';
declare class PageRepository extends BaseRepository<iPage> {
    protected readonly enableCache: boolean;
    getTestItem(key: string): iPage;
    getUrl(key: string, params: Hash<string>): string;
    prepareItemForStore(key: string, item: iWrapLoadableItem<iPage>): iWrapLoadableItem<iPage>;
}
export declare const pageRepository: PageRepository;
export {};
