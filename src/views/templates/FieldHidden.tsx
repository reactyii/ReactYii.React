//import * as React from 'react';
import { iContentProps } from '../../models/contentModels';
//import { Content } from '../Content';
//import { Utils } from '../../helpers/Utils';
import { iFieldState } from '../../models/commonModels';
import { Field } from './Field';

export class FieldHidden extends Field {

	// для оптимизации чтоб невызывался пререндер
	shouldComponentUpdate(props:iContentProps, state: iFieldState) {
		return false;
	}

	// тут ничего рендерить не надо
	renderField() {
		return [];
	}
}