import { BaseRepository, iWrapLoadableItem } from "./baseRepository";
import { iPage } from './pageModels';

class PageRepository extends BaseRepository<iPage>{
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
			request: null, // NB! очень важно тут null так как клонированный объект уходит в стор, а request мутирует!
			loaded: item.loaded
		};
	}
}

export const pageRepository = new PageRepository();