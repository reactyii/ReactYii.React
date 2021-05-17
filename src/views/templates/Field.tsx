import * as React from 'react';
import { iContentProps } from '../../models/contentModels';
import { Content } from '../Content';
import { Utils } from '../../helpers/Utils';
import { Console, Hash, iFieldState, iSite } from '../../models/commonModels';
import { iPage } from '../../models/pageModels';
import { StoreActions } from '../../features/page/StoreActions';
import StoreActionsWrapped from '../../features/page/StoreActionsWrapped';
import { BaseComponent } from './BaseComponent';

export class Field extends BaseComponent<iContentProps, iFieldState> {
	site: iSite;
	// не будем странциу засовывать в свойства компонента, страница меняется в течении жизни компонента
	//page: iPage;
	settings: Hash<string>; // пока предполагаем что настройки формы не изменятся во время жизни на странице
	formpath: string;
	fieldname: string;
	refStoreActions: React.RefObject<StoreActions>;

	constructor(props: iContentProps) {
		super(props);

		let error: string[] = Utils.checkContentProps(props, ['formpath', 'fieldname']);

		// вызов формы без этих параметров ошибка конфигурации
		this.settings = props.settings || {};
		this.site = props.session?.site as iSite;
		//this.page = props.pageWraper?.item as iPage;
		this.formpath = this.settings.formpath || 'unknown'; // наличие этих настроек проверяется выше (см установку значения let error = ...)
		this.fieldname = this.settings.fieldname || 'unknown';

		//error = ['test error', '1123'];

		//if (typeof props.settings === 'undefined') return;
		//const val: string | string[] = this.settings['type'] === 'array' ? JSON.parse(this.settings['value']) as string[] : this.settings['value'] as string;

		this.state = { error };

		//FormStorage.setValue(this.formpath, this.fieldname, val);

		this.handleChange = this.handleChange.bind(this);

		this.refStoreActions = React.createRef<StoreActions>();
	}/* */

	handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
		//if (typeof this.props.settings === 'undefined') return;

		Console.log('field change!', this.formpath, this.fieldname, event.target.value);
		//this.setState({ value: event.target.value });
		//FormStorage.setValue(this.formpath, this.fieldname, event.target.value as string | string[]);
		this.refStoreActions.current?.setFieldValue(this.formpath, this.fieldname, event.target.value); // | string[]
	}
	getValue() {
		return Utils.getFieldValue(this.props.pageWraper?.item?.forms || {}, this.formpath, this.fieldname);
	}
	renderErrorMessage(): React.ReactNode {
		const settings = this.props.settings || {}; // здесь нельзя использовать this.settings так как он не меняется после создания компонента
		return typeof settings.error === 'undefined' || !settings.error ? null : <Content content={Utils.genErrorContent([settings.error])} pageWraper={this.props.pageWraper} session={this.props.session} />;
	}
	renderField(): React.ReactNode {
		//if (typeof this.props.settings === 'undefined') return;

		const inp = <input type={this.settings['type'] as string} value={this.getValue()} onChange={this.handleChange} />;
		const err = this.renderErrorMessage();
		//Console.log('field error', this.formpath, this.fieldname, err);
		return err === null ? inp : <div>{inp}{err}</div>;
	}
	renderWraps(): React.ReactNode {
		return <StoreActionsWrapped ref={this.refStoreActions} />;
	}

	render() {
		//Console.log('hhhhhhhhhhhh1', this.props.content);

		return <>
			{this.renderWraps()}
			{this.renderField()}
		</>;
	}
}