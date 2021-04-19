import * as React from 'react';
//import { Console, ContentType } from '../../models/commonModels';
import { iContentProps } from '../../models/contentModels';
import { Content } from '../Content';
import { Utils } from '../../helpers/Utils';
import { FormStorage } from '../../helpers/FormStorage';
import { Hash, iFieldState, iSite } from '../../models/commonModels';
import { iPage } from '../../models/pageModels';
//import { Html } from '../Html';

export class Field extends React.Component<iContentProps, iFieldState> {
	constructor(props: iContentProps) {
		super(props);

		if (typeof props.settings === 'undefined') return;
		const val: string | string[] = props.settings['type'] === 'array' ? JSON.parse(props.settings['value']) as string[] : props.settings['value'] as string;

		this.state = { value: val };

		FormStorage.setValue(props.settings['formname'] as string, props.settings['fieldname'] as string, val);

		this.handleChange = this.handleChange.bind(this);
	}/* */

	handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
		if (typeof this.props.settings === 'undefined') return;

		this.setState({ value: event.target.value });
		FormStorage.setValue(this.props.settings['formname'] as string, this.props.settings['fieldname'] as string, event.target.value as string | string[]);
	}
	render_field() {
		if (typeof this.props.settings === 'undefined') return;
		return <input type={this.props.settings['type'] as string} value={this.state.value as string} onChange={this.handleChange} />;
	}

	render() {
		//Console.log('hhhhhhhhhhhh1', this.props.content);

		return this.render_field();
	}
}