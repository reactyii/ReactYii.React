import * as request from 'superagent';
import {
	Hash, 
	//ContentType,
} from './commonModels';

export interface iLoadableItem {
	//key: string; // item key (path for pages)
}

export interface iWrapLoadableItem<T> {
	key: string;
	item: T | null;
	loaded?: Date; // время загрузки итема
	request: request.SuperAgentRequest | null;
	err: string | null;
}

export abstract class BaseRepository<T extends iLoadableItem> {
	readonly host: string = 'http://yii.test';
	data: Hash<iWrapLoadableItem<T>> = {};

	public get(key: string, end: (item: iWrapLoadableItem<T>) => void) {
		if (typeof this.data[key] !== 'undefined' && this.data[key].item !== null) 
		{
			// также здесь можно проверить срок жизни итема в кеше
			//return this.data[id].item;
			end(this.prepareItemForStore(key, this.data[key]));
		}

		this.load(key, end);
	}

	public load(key: string, end: (item: iWrapLoadableItem<T>) => void) {
		if (typeof this.data[key] === 'undefined') {
			this.data[key] = {key: key, item: null, err: null, request: null};
		}
		
		console.log('load', this.data[key]);
		
		this.data[key].err = null; // скинем ошибку если была

		try { // тупо давим все ошибки если не вышло отменить и пес с ним
			this.data[key].request?.abort(); // отменим предидущий запрос
		} catch (error) {
			console.error('Ошибка при отмене запроса:', error);
		}

		(this.data[key].request = request.get(this.getUrl(key))).then(response => {
			console.log('data loaded', response);
			let status = typeof response !== 'undefined' ? response.status : 500;
			if (status !== 200) {
				this.data[key].err = 'error code: ' + status;
				return end(this.prepareItemForStore(key, this.data[key]));
			}

			this.data[key].request = null;

			this.data[key].loaded = new Date();

			this.data[key].item = response.body;

			return end(this.prepareItemForStore(key, this.data[key]));

		}, err => {
			console.log('load data error', err);
			if (err.timeout) { 
				/* timed out! */ 
				this.data[key].err = 'error timeout';
			} else { 
				/* other error */ 
				this.data[key].err = 'other error';
			}
			
			return end(this.prepareItemForStore(key, this.data[key]));
		});
		  
		return null;
	}

	abstract getUrl(key: string): string;
	abstract prepareItemForStore(key: string, item: iWrapLoadableItem<T>): iWrapLoadableItem<T>;

}