import { BaseRepository, iWrapLoadableItem } from "./baseRepository";
import { Hash } from "./commonModels";
import { iPage } from './pageModels';
import { Utils } from '../helpers/Utils';

class PageRepository extends BaseRepository<iPage>{
	//protected readonly abortAll: boolean = false;
	protected readonly enableCache: boolean = false;
	getTestItem(key: string): iPage {
		return {
			path: key, layout: '', content: [], seo: { title: 'loading...', description: '', keywords: '' }, lang: null, section: null, is_current_section: false, section_id: null, forms: {}
		};
	}
	getUrl(key: string, params: Hash<string>): string {
		let path = this.host + key;
		let p = Utils.joinUrlParams(params);

		if (p !== '') {
			path += (path.indexOf('?') >= 0 ? '&' : '?') + p;//'__siteLM=' + this.props.session.site.lastModified;
		}
		return path;
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