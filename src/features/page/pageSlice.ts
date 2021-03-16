import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';
import {iPageStoreState, iPage} from '../../models/pageModels';
import { pageRepository } from '../../models/pageRepository';
import { iWrapLoadableItem } from '../../models/baseRepository';

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
			console.log('TEST');
		},
		startLoadPage: (state, action: PayloadAction<string>) => {
			state.loadingPath = action.payload; // устанавливаем признак загрузки
		},
		// Use the PayloadAction type to declare the contents of `action.payload`
		endLoadPage: (state, action: PayloadAction<iWrapLoadableItem<iPage>>) => {

			console.log('endLoadPage:', action.payload.key, 'loadingPath=', state.loadingPath);

			// нужно проверить может быть юзер уже грузит другую страницу
			if (state.loadingPath !== action.payload.key) return;

			console.log('setPage:', action.payload);

			state.pageWraper = action.payload;
			state.loadingPath = '';
		}
	},
});

export const { testPage, startLoadPage, endLoadPage } = pageSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const loadPageAsync = (path: string): AppThunk => dispatch => {
	console.log('start loading:', path);
	dispatch(startLoadPage(path));

	pageRepository.get(path, item => {
		//console.log('loaded:', item);
		//setTimeout(() => {
			dispatch(endLoadPage(item));
		//}, 1000);/* */
	});

	/*setTimeout(() => {
		console.log('loaded:', path);
		var page: iPage = {key: path, template: '', layout: '', contents: []};
		dispatch(endLoadPage(page));
	}, 1000);/* */
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectPage = (state: RootState) => state.page.pageWraper;

export default pageSlice.reducer;
