import * as React from 'react';
//import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Console, Hash } from '../../models/commonModels';
import { RootState, AppDispatch } from '../../app/store';
import { startLoadPage, loadPageAsync, testPage, startFormSubmit } from '../../features/page/pageSlice';
import { RouteComponentProps } from 'react-router-dom';

export const mapStateToProps = (state: RootState) => (state.page);
/*const mapDispatchToProps = {
	setPage: setPage
}*/

// Thunk Action
export const mapDispatchToProps = (dispatch: AppDispatch) => bindActionCreators(
	{
		/*load: (path: string, params: Hash<string>) => async (dispatch: AppDispatch): Promise<void> => {
			dispatch(loadPageAsync(path, params))
		},/**/
		load: loadPageAsync,
		startLoadPage: startLoadPage,
		startFormSubmit: startFormSubmit,
		test: testPage
	},
	dispatch
);/* */

export type Props = ReturnType<typeof mapStateToProps>
	//& typeof mapDispatchToProps	
	& ReturnType<typeof mapDispatchToProps>
	//& RouteComponentProps<any>
	//& iPageLoaderProps
	;

type State = {};

export class StoreActions extends React.Component<Props, State> {

	public submitForm(path: string) {
		this.props.startFormSubmit(path);
	}

	public loadPage(path: string) {
		// может скопировать с PageLoader?
		//Console.log('loadPage', this.props.history);
		this.props.load(path, {});
	}

	render() {
		return null;//'---';
	}
}