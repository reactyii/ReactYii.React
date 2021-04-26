import * as React from 'react';
import { iContent, iContentProps } from '../../models/contentModels';
import { Content } from '../Content';
import { Utils } from '../../helpers/Utils';
import { Console, Hash } from '../../models/commonModels';
import { Field } from './Field';

export class FieldSelect extends Field {

	render_options(options: iContent[], prefix = "") {
		//const singlePrefix = 
		return options.map(item => {
			return <option key={item.id} value={item.path}>{item.content}</option>
		});
	}

	renderField() {
		//if (typeof this.props.settings === 'undefined') return;
		return <select onChange={this.handleChange}>{
			this.render_options(this.props.content.filter(item => {
				return typeof item.content_keys === 'undefined' || item.content_keys.indexOf('CONTENT') >= 0;
			}))
		}</select>;
	}
}