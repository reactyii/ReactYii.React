import * as React from 'react';
import { iContentProps } from '../../models/contentModels';
import { Content } from '../Content';
import { Utils } from '../../helpers/Utils';
import { Console, Hash } from '../../models/commonModels';
import { FormFilter } from './FormFilter';

export class FormFilterContent extends FormFilter {
	render_form(action: string, method: string, content: React.ReactNode) {
		//Console.log('!!!!!!!');
		return <form action={action} method={method}>{content}</form>;
	}
}