//import * as React from 'react';
import { iContentProps } from '../../models/contentModels';
//import { Content } from '../Content';
//import { Utils } from '../../helpers/Utils';
import { iFieldState } from '../../models/commonModels';
import { Field } from './Field';

export class FieldHidden extends Field {

	// ��� ����������� ���� ����������� ���������
	shouldComponentUpdate(props:iContentProps, state: iFieldState) {
		return false;
	}

	// ��� ������ ��������� �� ����
	renderField() {
		return [];
	}
}