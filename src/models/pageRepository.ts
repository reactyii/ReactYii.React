import { BaseRepository, iWrapLoadableItem } from "./baseRepository";
import { iPage } from './pageModels';

class PageRepository extends BaseRepository<iPage>{
	protected readonly abortAll: boolean = false;
	protected readonly enableCache: boolean = false;
	getTestItem(key: string): iPage {
		return {path: key, template: '', layout: '', contents: []}
	}
	getUrl(key: string): string {
		return this.host + key;
	}

	prepareItemForStore(key: string, item: iWrapLoadableItem<iPage>): iWrapLoadableItem<iPage> {
		//let page = item.item; 
		//if (page === null) page = {key: key, layout: '', template: '', contents: []};
		//page.key = key;
		return {
			key: item.key,
			item: item.item,//page, 
			err: item.err,
			//request: null, // NB! очень важно тут null так как клонированный объект уходит в стор, а request мутирует!
			abortController: null, // NB! очень важно тут null так как клонированный объект уходит в стор, а request мутирует!
			loaded: item.loaded
		};
	}
}

export const pageRepository = new PageRepository();