import * as React from 'react';
import { iContent, iContentProps } from '../../models/contentModels';
import { Content } from '../Content';
import { Utils } from '../../helpers/Utils';
import { Console, Hash } from '../../models/commonModels';
import { Field } from './Field';

export class FieldSelect extends Field {
	constructor(props: iContentProps) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
	}
	handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
		//if (typeof this.props.settings === 'undefined') return;

		Console.log('select change!', this.formpath, this.fieldname, event.target.selectedOptions);
		const vals = Array.from(event.target.selectedOptions, (item: HTMLOptionElement) => item.value);
		//this.setState({ value: event.target.value });
		//FormStorage.setValue(this.formpath, this.fieldname, event.target.value as string | string[]);
		this.refStoreActions.current?.setFieldValue(this.formpath, this.fieldname, vals);
	}
	renderOptions(options: iContent[], selected: string[] = [], prefix = ""): React.ReactNode {
		//const singlePrefix = 
		return options.map(item => {
			// так как у нас может быть html в частности в префиксе &raquo;
			return <option key={item.id} value={item.path} dangerouslySetInnerHTML={{ __html: item.content }}></option>; // selected={selected.indexOf(item.path) >= 0}
		});
	}

	renderField(): React.ReactNode {
		//if (typeof this.props.settings === 'undefined') return;
		const value = Utils.getFieldValue(this.props.pageWraper?.item?.forms || {}, this.formpath, this.fieldname);
		const multiple = !!this.props.settings?.multiple;
		const selected = multiple && !Array.isArray(value) ? [value] : value;
		
		//const _val = multiple &&
		return <select value={selected} multiple={multiple} onChange={this.handleChange}>{
			this.renderOptions(this.props.content.filter(item => {
				return typeof item.content_keys === 'undefined' || item.content_keys.indexOf('CONTENT') >= 0;
			})) // 
		}</select>;
	}
}