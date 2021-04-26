import * as React from 'react';
import { iContentProps } from '../../models/contentModels';
import { Content } from '../Content';
import { Utils } from '../../helpers/Utils';
import { Console, Hash, iFieldState, iSite } from '../../models/commonModels';
import { iPage } from '../../models/pageModels';
import { StoreActions } from '../../features/page/StoreActions';
import StoreActionsWrapped from '../../features/page/StoreActionsWrapped';

export class Field extends React.Component<iContentProps, iFieldState> {
	site: iSite;
	page: iPage;
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
		this.page = props.pageWraper?.item as iPage;
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

	private initialised: boolean = false;
	init() {
		if (this.initialised) return;
		if (this.refStoreActions.current !== null) {
			this.initialised = true;
			Console.log('init field');
			const val: string | string[] = this.settings['type'] === 'array' ? JSON.parse(this.settings['value']) as string[] : this.settings['value'] as string;
			this.refStoreActions.current?.setFieldValue(this.formpath, this.fieldname, val);
		}
	}

	// при первом рендере у нас еще this.refStoreActions.current === null и потому
	/*componentDidMount() {
		const val: string | string[] = this.settings['type'] === 'array' ? JSON.parse(this.settings['value']) as string[] : this.settings['value'] as string;
		this.refStoreActions.current?.setFieldValue(this.formpath, this.fieldname, val);
	}*/
	componentDidMount() {
		this.init();
	}
	componentDidUpdate() {
		this.init();
	}

	handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
		//if (typeof this.props.settings === 'undefined') return;

		Console.log('field change!', this.formpath, this.fieldname, event.target.value);
		//this.setState({ value: event.target.value });
		//FormStorage.setValue(this.formpath, this.fieldname, event.target.value as string | string[]);
		this.refStoreActions.current?.setFieldValue(this.formpath, this.fieldname, event.target.value as string | string[]);
	}
	renderField(): React.ReactNode {
		//if (typeof this.props.settings === 'undefined') return;
		Console.log('---->', this.refStoreActions.current?.getFieldValue(this.formpath, this.fieldname));
		const val = this.refStoreActions.current?.getFieldValue(this.formpath, this.fieldname) as string || '';
		return <input type={this.settings['type'] as string} value={val} onChange={this.handleChange} />;
	}
	renderWraps() {
		return <>
			<StoreActionsWrapped ref={this.refStoreActions} />
		</>;
	}

	render() {
		//Console.log('hhhhhhhhhhhh1', this.props.content);

		return <>
			{this.renderWraps()}
			{this.renderField()}
		</>;
	}
}