import * as React from 'react';
//import { iContent, iContentProps } from '../../models/contentModels';
//import { Content } from '../Content';
import { Utils } from '../../helpers/Utils';
//import { Console, Hash, iFieldState } from '../../models/commonModels';
import { FieldSelect } from './FieldSelect';

export class FieldFilterSelect extends FieldSelect {

	renderField(): React.ReactNode {
		const value = Utils.getFieldValue(this.props.pageWraper?.item?.forms || {}, this.formpath, this.fieldname);
		const multiple = !!this.props.settings?.multiple;
		const selected = multiple && !Array.isArray(value) ? [value] : value;

		//const _val = multiple &&
		return <select value={selected} multiple={multiple} onChange={this.handleChange}>{
			this.renderOptions(this.getContentByKey()) // 
		}</select>;
	}
}