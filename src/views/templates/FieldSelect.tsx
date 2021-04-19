import * as React from 'react';
import { iContentProps } from '../../models/contentModels';
import { Content } from '../Content';
import { Utils } from '../../helpers/Utils';
import { Console, Hash } from '../../models/commonModels';
import { Field } from './Field';

export class FieldSelect extends Field {

	render_field() {
		if (typeof this.props.settings === 'undefined') return;
		return <select onChange={this.handleChange}>{

		}</select>;
	}
}