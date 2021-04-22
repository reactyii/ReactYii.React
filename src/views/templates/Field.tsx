import * as React from 'react';
//import { Console, ContentType } from '../../models/commonModels';
import { iContentProps } from '../../models/contentModels';
import { Content } from '../Content';
import { Utils } from '../../helpers/Utils';
import { FormStorage } from '../../helpers/FormStorage';
import { Hash, iFieldState, iSite } from '../../models/commonModels';
import { iPage } from '../../models/pageModels';
import { StoreActions } from '../../features/page/StoreActions';
//import { Html } from '../Html';

export class Field extends React.Component<iContentProps, iFieldState> {
	site: iSite;
	page: iPage;
	settings: Hash<string>; // пока предполагаем что настройки формы не изменятся во время жизни на странице
	refStoreActions: React.RefObject<StoreActions>;

	constructor(props: iContentProps) {
		super(props);

		let error: string[] = Utils.checkContentProps(props, ['formname', 'fieldname']);

		// вызов формы без этих параметров ошибка конфигурации
		this.settings = props.settings || {};
		this.site = props.session?.site as iSite;
		this.page = props.pageWraper?.item as iPage;

		//error = ['test error', '1123'];

		//if (typeof props.settings === 'undefined') return;
		const val: string | string[] = this.settings['type'] === 'array' ? JSON.parse(this.settings['value']) as string[] : this.settings['value'] as string;

		this.state = { value: val, error };

		FormStorage.setValue(this.settings['formname'] as string, this.settings['fieldname'] as string, val);

		this.handleChange = this.handleChange.bind(this);

		this.refStoreActions = React.createRef<StoreActions>();
	}/* */

	handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
		//if (typeof this.props.settings === 'undefined') return;

		this.setState({ value: event.target.value });
		FormStorage.setValue(this.settings['formname'] as string, this.settings['fieldname'] as string, event.target.value as string | string[]);
	}
	render_field(): React.ReactNode {
		if (typeof this.props.settings === 'undefined') return;
		return <input type={this.settings['type'] as string} value={this.state.value as string} onChange={this.handleChange} />;
	}

	render() {
		//Console.log('hhhhhhhhhhhh1', this.props.content);

		return this.render_field();
	}
}