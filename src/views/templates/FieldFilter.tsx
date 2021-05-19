import * as React from 'react';
//import { iContent, iContentProps } from '../../models/contentModels';
//import { Content } from '../Content';
//import { Utils } from '../../helpers/Utils';
//import { Console, Hash, iFieldState } from '../../models/commonModels';
import { Field } from './Field';

export class FieldFilter extends Field {

	renderField() {
		return <input className={this.getSetting('inputclass') } type={this.getSetting('fieldtype')} placeholder={this.getSetting('label', '')} value={this.getValue()} onChange={this.handleChange} />;
	}
}