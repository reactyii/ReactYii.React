import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';
import {iPageStoreState, iPage} from '../../models/pageModels';
import { pageRepository } from '../../models/pageRepository';
import { iWrapLoadableItem } from '../../models/baseRepository';
import { Console, ContentType, Hash, iSection } from '../../models/commonModels';
import { iContent } from '../../models/contentModels';
//import { Content } from '../../views/Content';

// https://github.com/stereobooster/react-snap
// Grab the state from a global variable injected into the server-generated HTML

const _state = typeof window !== 'undefined' ? (window as any).__PRELOADED_STATE__ : undefined;
const preloadedState: iPageStoreState = typeof _state !== 'undefined' ? _state.page : undefined;

// в данный момент для SSR мы используем только данные самой страницы все остальные сторы не участвуют в генерации контента
if (typeof (window as any) !== 'undefined') {
	// Allow the passed state to be garbage-collected
	delete (window as any).__PRELOADED_STATE__;
}/**/

const initialState: iPageStoreState = {
	//currentPath: '',
	loadingPath: '',
	//forms: {},
	//page: null,
	//value: {},
}
/*interface iStartLoadPageParams {
	path: string;
}
interface iEndLoadPageParams {
	path: string; // путь который грузили (может пригодится, например, в случе ошибки для формирования задачи на повторную загрузку)
	page?: iPage;
	error?: string;
}/* */

interface iFormClearPayload {
	formkey: string;
	fullClear?: boolean;
}
interface iSetValuePayload {
	formkey: string;
	fieldName: string;
	value: string | string[];
}

const fieldtypes = ['field'];
function fillForm(content: iContent[]): Hash<string | string[]> {
	const fields: Hash<string | string[]> = {};
	for (let i = 0, l = content.length; i < l; i++) {
		const c: iContent = content[i];
		if (fieldtypes.indexOf(c.type as string) >= 0) {
			
			if (typeof c.settings === 'undefined' || typeof c.settings.fieldname === 'undefined') {
				Console.error('Единица контента типа "' + (c.type as string) + '" не имеет имени поля.', c);
				continue;
			} else {
				let n: string = c.settings.fieldname;
				if (typeof c.settings.value !== 'undefined')
					fields[n] = c.settings.value;
			}
        }
	}

	return fields;
}

function findForms(content: iContent[]): Hash<Hash<string | string[]>> {
	const forms: Hash<Hash<string | string[]>> = {};
	for (let i = 0, l = content.length; i < l; i++) {
		const c: iContent = content[i];
		/*if (!c) {
			Console.error('content[' + i + '] is WTF:', content);
			continue;
		}
		if (typeof c.type === 'undefined') {
			Console.error('c.type is undefined:', c);
			continue;
		}/**/
		if (c.type !== ContentType.Form) {
			const _form = findForms(c.childs || []);
			for (let k in _form) {
				forms[k] = _form[k];
            }
			continue;
		}
		if (typeof c.settings === 'undefined' || typeof c.settings.path === 'undefined') {
			Console.error('У формы "' + (c.id) + '" не указан path.', c);
			continue;
		}
		forms[c.settings.path] = fillForm(c.childs || []);
	}
	return forms;
}

export const pageSlice = createSlice({
	name: 'page',
	initialState: preloadedState || initialState,
	reducers: {
		testPage: state => {
			// Redux Toolkit allows us to write "mutating" logic in reducers. It
			// doesn't actually mutate the state because it uses the Immer library,
			// which detects changes to a "draft state" and produces a brand new
			// immutable state based off those changes
			//state.value += 1;
			Console.log('TEST');
		},

		// ------------------------------ forms
		clearForm(state, action: PayloadAction<iFormClearPayload>) {
			if (!state.pageWraper?.item) return;
			const formkey = action.payload.formkey;
			const fullClear = action.payload.fullClear || false;
			if (typeof state.pageWraper.item.forms[formkey] === 'undefined') return;
			if (fullClear) {
				state.pageWraper.item.forms[formkey] = {};
				return;
			}

			for (let i in state.pageWraper.item.forms[formkey]) {
				if (i.startsWith('_')) continue; // все поля начинающиеся с '_' считаем системными (типа сортировки)
				delete state.pageWraper.item.forms[formkey][i];
			}
		},
		/*getFilterContentArgs(state, action: PayloadAction<string>): string {
			if (typeof _storage[formkey] === 'undefined') return '';
			return Utils.joinUrlParams(_storage[formkey]);//.replace('&', encodeURIComponent('&'));
		},*/
		setFieldValue(state, action: PayloadAction<iSetValuePayload>) {
			if (!state.pageWraper?.item) return;
			const formkey = action.payload.formkey;
			const fieldName = action.payload.fieldName;
			const value = action.payload.value;

			if (typeof state.pageWraper.item.forms[formkey] === 'undefined') return;
			Console.log('setValue', fieldName, value);
			state.pageWraper.item.forms[formkey][fieldName] = value;
		},

		startFormSubmit: (state, action: PayloadAction<string>) => {
			state.loadingPath = action.payload; // устанавливаем признак загрузки

			// todo сделать признак того что форма сабмитится. херить данные всех форм идея так себе, но и возможность юзеру менять данные при сабмите тоже не айс
			// в теории мы так можем скрыть форму
			/*if (state.pageWraper?.item) {
				state.pageWraper.item.forms = {};
				Console.log('clear forms');
			}/**/

			Console.log('startFormSubmit', action.payload);
		},
		/*endFormSubmit: (state, action: PayloadAction<iWrapLoadableItem<iPage>>) => {
			Console.log('endFormSubmit');
		},*/
		// ------------------------------ / forms


		startLoadPage: (state, action: PayloadAction<string>) => {
			state.loadingPath = action.payload; // устанавливаем признак загрузки
		},
		// Use the PayloadAction type to declare the contents of `action.payload`
		endLoadPage: (state, action: PayloadAction<iWrapLoadableItem<iPage>>) => {

			//Console.log('endLoadPage:', action.payload.key, 'loadingPath=', state.loadingPath);

			// нужно проверить может быть юзер уже грузит другую страницу
			if (state.loadingPath !== action.payload.key) return;

			Console.log('setPage:', action.payload);

			state.pageWraper = action.payload;
			if (state.pageWraper.item) {
				state.pageWraper.item.forms = findForms(state.pageWraper.item.content || []);
				//Console.log('forms=', state.pageWraper.item.forms);
			}
			if (typeof state.session === 'undefined') state.session = {};
			if (typeof action.payload.item?.session?.site !== 'undefined') {
				//Console.log('setSite:', action.payload.item.session.site);
				state.session.site = action.payload.item.session.site;
				let _hash: Hash<iSection> = {};
				if (typeof state.session.site !== 'undefined')
					state.session.site.sections.forEach(s => { _hash['_' + s.id] = s; });
				state.session.site.sections_hash = _hash;
			}
			if (typeof action.payload.item?.session?.user !== 'undefined') {
				state.session.user = action.payload.item.session.user;
			}

			delete state.pageWraper.item?.session; // чтоб место не занимало

			state.loadingPath = '';
		}
	},
});

export const { testPage, startLoadPage, endLoadPage, clearForm, setFieldValue, startFormSubmit/*, endFormSubmit*/ } = pageSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const loadPageAsync = (path: string, get: Hash<string>): AppThunk => dispatch => {
	Console.log('start loading:', path);
	dispatch(startLoadPage(path));

	pageRepository.get(path, get, item => {
		//Console.log('loaded:', item);
		//setTimeout(() => {
			dispatch(endLoadPage(item));
		//}, 1000);/* */
	});

	/*setTimeout(() => {
		Console.log('loaded:', path);
		let page: iPage = {key: path, template: '', layout: '', contents: []};
		dispatch(endLoadPage(page));
	}, 1000);/* */
};

export const postFormAsync = (path: string, get: Hash<string>, post: Hash<string | string[]>): AppThunk => dispatch => {
	Console.log('start post:', path);
	dispatch(startFormSubmit(path));

	pageRepository.post(path, get, post, item => {
		//Console.log('loaded:', item);
		//setTimeout(() => {
		dispatch(endLoadPage(item));
		//}, 1000);/* */
	});

	/*setTimeout(() => {
		Console.log('loaded:', path);
		let page: iPage = {key: path, template: '', layout: '', contents: []};
		dispatch(endLoadPage(page));
	}, 1000);/* */
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectPage = (state: RootState) => state.page.pageWraper;

export default pageSlice.reducer;
