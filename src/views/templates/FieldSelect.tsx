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
		//Console.log('multiple=', this.props.settings?.multiple);
		
		const vals = Array.from(event.target.selectedOptions, (item: HTMLOptionElement) => item.value);
		const multiple = !!this.props.settings?.multiple;

		//this.setState({ value: event.target.value });
		//FormStorage.setValue(this.formpath, this.fieldname, event.target.value as string | string[]);
		this.refStoreActions.current?.setFieldValue(this.formpath, this.fieldname, multiple ? vals : (vals.length > 0 ? vals[0] : ''));
	}
	renderOptions(options: iContent[], selected: string[] = [], singlePrefix = '&raquo;', prefix = ""): React.ReactNode[] {
		//const singlePrefix = 
		return options.map(item => {
			// так как у нас может быть html в частности в префиксе &raquo;
			const opt: React.ReactNode[] = [<option key={item.id} value={item.path} dangerouslySetInnerHTML={{ __html: prefix + item.content }}></option>]; // selected={selected.indexOf(item.path) >= 0}

			const opts: React.ReactNode[] = typeof item.childs !== 'undefined' && item.childs.length > 0 ? this.renderOptions(item.childs, selected, singlePrefix, prefix + singlePrefix) : [];

			return opt.concat(opts);
		});

	}

	renderField(): React.ReactNode {
		//if (typeof this.props.settings === 'undefined') return;
		const value = Utils.getFieldValue(this.props.pageWraper?.item?.forms || {}, this.formpath, this.fieldname);
		const multiple = !!this.props.settings?.multiple;
		const selected = multiple && !Array.isArray(value) ? [value] : value;

		const err = this.renderErrorMessage();
		
		//const _val = multiple &&
		const select =<select value={selected} multiple={multiple} onChange={this.handleChange}>{
			this.renderOptions(this.getContentByKey()) // 
		}</select>;

		return err === null ? select : <div>{select}{err}</div>;
	}
}