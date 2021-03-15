//import * as request from 'superagent'; // годные доки https://visionmedia.github.io/superagent/
import 'isomorphic-fetch'; // https://www.digitalocean.com/community/tutorials/js-fetch-api
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
	loaded?: number; // время загрузки итема
	//request: null,//request.SuperAgentRequest | null;
	abortController: AbortController | null,
	err: string | null;
}

const prepareHost = (host: string): string => {
	if (typeof host === 'undefined') {
		console.error('".env" file required. please, rename ".env.inc" to ".env" and set vars.');
		return '';
    }
	const h = host.trim();
	const l = h.length;

	//console.log('!!', h.substring(l - 1, l), h.substring(0, l - 1));
	return h.substring(l - 1, l) === '/' ? h.substring(0, l - 1) : h;// || 'http://yii.test';
};

export abstract class BaseRepository<T extends iLoadableItem> {
	readonly host: string = prepareHost(process.env.REACT_APP_HOST as string);
	protected readonly enableCache: boolean = true;
	protected readonly abortAll: boolean = true; // если true то отменяем все другие запросы
	protected readonly data: Hash<iWrapLoadableItem<T>> = {};
	private abortController: AbortController | null = null;

	public get(key: string, end: (item: iWrapLoadableItem<T>) => void) {
		console.log('this.enableCache=', this.enableCache);
		if (this.enableCache && typeof this.data[key] !== 'undefined' && this.data[key].item !== null) 
		{
			console.log('get from cache', this.data[key]);
			// также здесь можно проверить срок жизни итема в кеше
			//return this.data[id].item;
			return end(this.prepareItemForStore(key, this.data[key]));
		}

		this.load(key, end);
	}

	public load(key: string, end: (item: iWrapLoadableItem<T>) => void) {
		if (typeof this.data[key] === 'undefined') {
			this.data[key] = { key: key, item: null, err: null, abortController: null/*, request: null*/ };
		}

		console.log('load from ', this.host, this.data[key]);

		this.data[key].err = null; // скинем ошибку если была

		try { // тупо давим все ошибки если не вышло отменить и пес с ним
			console.log('try cancel ', key);
			this.abortController?.abort();
			this.data[key].abortController?.abort();
		} catch (error) {
			console.error('Ошибка при отмене запроса:', error);
		}

		// https://learn.javascript.ru/fetch-abort
		const options = {
			method: 'GET',
			signal: this.abortAll ? (this.abortController = new AbortController()).signal : (this.data[key].abortController = new AbortController()).signal,
			//body: JSON.stringify(myPost),
			headers: {
				'Content-Type': 'application/json',
				'X-Requested-With': 'XMLHttpRequest'
			}
		};
		fetch(this.getUrl(key), options).then(res => {
			//console.log('data loaded1', res);
			if (res.ok) {
				return res.json();
			} else {
				return Promise.reject({ status: res.status, statusText: res.statusText });
			}
		}).then(response => {
			console.log('data loaded', response);
			/*let status = typeof response !== 'undefined' ? response.status : 500;
			if (status !== 200) {
				this.data[key].err = 'error code: ' + status;
				return end(this.prepareItemForStore(key, this.data[key]));
			}*/

			this.data[key].loaded = Date.now(); //new Date();
			this.data[key].item = response;//.body;

			return end(this.prepareItemForStore(key, this.data[key]));
		}).catch(err => {
			console.error('load data error', err);
			if (err.timeout) {
				this.data[key].err = 'error timeout';
			} else {
				this.data[key].err = 'other error:' + err.status;
			}

			return end(this.prepareItemForStore(key, this.data[key]));
		}).finally(() => {
			//this.data[key].request = null;
			this.data[key].abortController = null;
			this.abortController = null;
		});

		// отладка отмены
		//setTimeout(() => this.data[key].abortController?.abort(), 1000);
		
		/*
		try { // тупо давим все ошибки если не вышло отменить и пес с ним
			this.data[key].request?.abort(); // отменим предидущий запрос
		} catch (error) {
			console.error('Ошибка при отмене запроса:', error);
		}
		
		(this.data[key].request = request
		.get(this.getUrl(key)))
		.set('Accept', 'application/json')
		.set('X-Requested-With', 'XMLHttpRequest')
		//.withCredentials() // https://visionmedia.github.io/superagent/#cors
		.then(response => {
			console.log('data loaded', response);
			let status = typeof response !== 'undefined' ? response.status : 500;
			if (status !== 200) {
				this.data[key].err = 'error code: ' + status;
				return end(this.prepareItemForStore(key, this.data[key]));
			}

			this.data[key].request = null;
			this.data[key].loaded = Date.now(); //new Date();
			this.data[key].item = response.body;

			return end(this.prepareItemForStore(key, this.data[key]));

		}, err => {
			console.log('load data error', err);
			if (err.timeout) { 
				this.data[key].err = 'error timeout';
			} else {
				this.data[key].err = 'other error';
			}
			
			return end(this.prepareItemForStore(key, this.data[key]));
		});/* */

		// блок тестирования
		/*setTimeout(() => {
			//this.data[key].request = null;
			this.data[key].abortController = null;
			this.data[key].loaded = Date.now(); //new Date();
			this.data[key].item = this.getTestItem(key);

			return end(this.prepareItemForStore(key, this.data[key]));
		}, 1000);/* */
		  
		return null;
	}

	abstract getTestItem(key: string): T;
	abstract getUrl(key: string): string;
	abstract prepareItemForStore(key: string, item: iWrapLoadableItem<T>): iWrapLoadableItem<T>;

}