import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';
import {iPageStoreState, iPage} from '../../models/pageModels';
import { pageRepository } from '../../models/pageRepository';
import { iWrapLoadableItem } from '../../models/baseRepository';
import { Console, Hash, iSection } from '../../models/commonModels';

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
	forms: {},
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
		initForm(state, action: PayloadAction<string>) {
			// так как форму инициализируютс разные компоненты (и список и форма), то чтобы не затереть данные сделаем проверку
			if (typeof state.forms[action.payload] === 'undefined') state.forms[action.payload] = {};
		},
		clearForm(state, action: PayloadAction<iFormClearPayload>) {
			const formkey = action.payload.formkey;
			const fullClear = action.payload.fullClear || false;
			if (typeof state.forms[formkey] === 'undefined') return;
			if (fullClear) {
				state.forms[formkey] = {};
				return;
			}

			for (let i in state.forms[formkey]) {
				if (i.startsWith('_')) continue; // все поля начинающиеся с '_' считаем системными (типа сортировки)
				delete state.forms[formkey][i];
			}
		},
		/*getFilterContentArgs(state, action: PayloadAction<string>): string {
			if (typeof _storage[formkey] === 'undefined') return '';
			return Utils.joinUrlParams(_storage[formkey]);//.replace('&', encodeURIComponent('&'));
		},*/
		setFieldValue(state, action: PayloadAction<iSetValuePayload>) {
			const formkey = action.payload.formkey;
			const fieldName = action.payload.fieldName;
			const value = action.payload.value;

			if (typeof state.forms[formkey] === 'undefined') return;
			Console.log('setValue', fieldName, value);
			state.forms[formkey][fieldName] = value;
		},

		startFormSubmit: (state, action: PayloadAction<string>) => {
			//state.loadingPath = action.payload; // устанавливаем признак загрузки
			Console.log('startFormSubmit', action.payload);
		},
		endFormSubmit: (state, action: PayloadAction<iWrapLoadableItem<iPage>>) => {
			Console.log('endFormSubmit');
		},
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
			if (typeof state.session === 'undefined') state.session = {};
			if (typeof action.payload.item?.session?.site !== 'undefined') {
				//Console.log('setSite:', action.payload.item.session.site);
				state.session.site = action.payload.item.session.site;
				let _hash: Hash<iSection> = {};
				if (typeof state.session.site !== 'undefined')
					state.session.site.sections.map(s => { _hash['_' + s.id] = s; });
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

export const { testPage, startLoadPage, endLoadPage, initForm, clearForm, setFieldValue, startFormSubmit, endFormSubmit } = pageSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const loadPageAsync = (path: string, params: Hash<string>): AppThunk => dispatch => {
	Console.log('start loading:', path);
	dispatch(startLoadPage(path));

	pageRepository.get(path, params, item => {
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
