import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';
import {iPageState, iPage} from '../../models/pageModels';

const initialState: iPageState = {
	currentPath: '',
	//value: {},
}

export const pageSlice = createSlice({
	name: 'page',
	initialState,
	reducers: {
		testPage: state => {
			// Redux Toolkit allows us to write "mutating" logic in reducers. It
			// doesn't actually mutate the state because it uses the Immer library,
			// which detects changes to a "draft state" and produces a brand new
			// immutable state based off those changes
			//state.value += 1;
			console.log('TEST');
			;
		},
		setCurrentPath: (state, action: PayloadAction<string>) => {
			state.currentPath = action.payload;
		},
		// Use the PayloadAction type to declare the contents of `action.payload`
		setPage: (state, action: PayloadAction<iPage>) => {
			console.log('setPage:', action.payload);
			state.value = action.payload;
		}
	},
});

export const { testPage, setCurrentPath, setPage } = pageSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const loadAsync = (path: string): AppThunk => dispatch => {
	console.log('start loading:', path);
	dispatch(setCurrentPath(path));
	setTimeout(() => {
		console.log('loaded:', path);
		var page:iPage = {template:'', layout:'', contents:[]};
		dispatch(setPage(page));
	}, 1000);
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectPage = (state: RootState) => state.page.value;

export default pageSlice.reducer;
