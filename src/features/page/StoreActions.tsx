import * as React from 'react';
//import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Console, Hash } from '../../models/commonModels';
import { RootState, AppDispatch } from '../../app/store';
import { startLoadPage, loadPageAsync, testPage, startFormSubmit, clearForm, setFieldValue } from '../../features/page/pageSlice';
import { RouteComponentProps } from 'react-router-dom';
import { Utils } from '../../helpers/Utils';

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
		clearForm: clearForm,
		setFieldValue: setFieldValue,
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

	// для оптимизации чтоб невызывался пререндер
	shouldComponentUpdate(nextProps: Props, nextState: State) {
		return false;
	}

	public clearForm(formkey: string, fullClear: boolean = false) {
		this.props.clearForm({ formkey, fullClear });
	}
	public setFieldValue(formkey: string, fieldName: string, value: string | string[]) {
		this.props.setFieldValue({ formkey, fieldName, value });
	}
	/*public getFieldValue(formkey: string, fieldName: string): string | string[] {
		if (typeof this.props.forms[formkey] === 'undefined') return '';
		if (typeof this.props.forms[formkey][fieldName] === 'undefined') return '';
		return this.props.forms[formkey][fieldName];
	}/**/

	/*public getFilterContentArgs(formkey: string): string {
		if (typeof this.props.pageWraper?.item?.forms[formkey] === 'undefined') return '';
		return Utils.joinUrlParams(this.props.pageWraper?.item?.forms[formkey], true, Utils.encodePercentsSymbol);//.replace('&', encodeURIComponent('&'));
	}/**/

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