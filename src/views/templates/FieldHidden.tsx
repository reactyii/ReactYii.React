import * as React from 'react';
import { iContent, iContentProps } from '../../models/contentModels';
import { Content } from '../Content';
import { Utils } from '../../helpers/Utils';
import { Console, Hash } from '../../models/commonModels';
import { Field } from './Field';

export class FieldHidden extends Field {

	// тут ничего рендерить не надо
	renderField() {
		return [];
	}
}