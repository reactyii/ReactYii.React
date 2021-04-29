import * as React from 'react';
//import { Console, ContentType } from '../../models/commonModels';
import { iContentProps } from '../../models/contentModels';
import { Content } from '../Content';
import { Utils } from '../../helpers/Utils';
//import { FormStorage } from '../../helpers/FormStorage';
import { Console, Hash, iSite } from '../../models/commonModels';
import { iPage } from '../../models/pageModels';
import { StoreActions } from '../../features/page/StoreActions';
import StoreActionsWrapped from '../../features/page/StoreActionsWrapped';
import { Link } from 'react-router-dom';
//import { Html } from '../Html';

export class FormReset extends React.Component<iContentProps, {}> {
	site: iSite;
	page: iPage;
	settings: Hash<string>; // пока предполагаем что настройки формы не изменятся во время жизни на странице
	formpath: string;
	//fieldname: string;
	//refStoreActions: React.RefObject<StoreActions>;

	constructor(props: iContentProps) {
		super(props);

		let error: string[] = Utils.checkContentProps(props, ['formpath']);

		// вызов формы без этих параметров ошибка конфигурации
		this.settings = props.settings || {};
		this.site = props.session?.site as iSite;
		this.page = props.pageWraper?.item as iPage;
		this.formpath = this.settings.formpath || 'unknown'; // наличие этих настроек проверяется выше (см установку значения let error = ...)

		//this.handleClick = this.handleClick.bind(this);

		//this.refStoreActions = React.createRef<StoreActions>();

	}/* */


	/*handleClick(event: React.MouseEvent<HTMLButtonElement>) {
		Console.log('FormReset handleClick!!!!!!!!!', this.formpath);
		//FormStorage.clearForm(this.formpath);
	}*/

	renderButton() {
		//return <button type="submit" onClick={this.handleClick}>reset</button>;
		// todo! добавить сортировку в filterAndSort аргумент
		const [not_used_host0, url] = Utils.makeFilterUrl(this.page, this.page, this.site, this.formpath, '0', '');
		return <Link to={url}>{this.props.settings?.value || 'Reset'}</Link>;
	}
	renderWraps() {
		return [];
		/*return <>
			<StoreActionsWrapped ref={this.refStoreActions} />
		</>;/**/
	}
	render() {
		return <>
			{this.renderWraps()}
			{this.renderButton()}
		</>;/**/
	}
}