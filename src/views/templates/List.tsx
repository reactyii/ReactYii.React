import * as React from 'react';
import { StoreActions } from '../../features/page/StoreActions';
import StoreActionsWrapped from '../../features/page/StoreActionsWrapped';
import { Utils } from '../../helpers/Utils';
import { Console, Hash, iSite } from '../../models/commonModels';
//import { Console, ContentType } from '../../models/commonModels';
import { iContent, iContentProps } from '../../models/contentModels';
import { iPage } from '../../models/pageModels';
import { Content } from '../Content';
import { Paginator } from './Paginator';

export interface iListState {

	error: string[];
}


export class List extends React.Component<iContentProps, iListState> {
	path: string;
	site: iSite;
	page: iPage;
	// не будем использовать! так как настройки (в частности пагинатора) будут меняться
	//settings: Hash<string>; // NB!!! использваоть тока для фиксированных свойств, например "path"! 
	refStoreActions: React.RefObject<StoreActions>;

	constructor(props: iContentProps) {
		super(props);

		let error: string[] = Utils.checkContentProps(props, ['path']);

		// вызов формы без этих параметров ошибка конфигурации
		//this.settings = props.settings || {};
		this.site = props.session?.site as iSite;
		this.page = props.pageWraper?.item as iPage;

		// так как фильтр нам нужен и в списке! то юзаем вместе имени формы path
		this.path = this.props.settings?.path || 'unknown'; // path у списка не меняется

		//error = ['test error', '1123'];

		this.state = { error };

		//Console.log('.....', props.settings);

		this.refStoreActions = React.createRef<StoreActions>();

	}/* */

	/*componentDidMount() {
		// форму инициализирует и список! так как сортировка будет храниться тоже в форме, а фильтра может не быть!
		this.refStoreActions.current?.initForm(this.path);
	}/**/


	drawContent(key: string) {
		const content = this.props.content.filter(item => item.content_keys?.indexOf(key) >= 0);
		if (content.length === 0) return null;
		return <Content content={content} pageWraper={this.props.pageWraper} session={this.props.session} />;
	}
	renderHeader() {
		return this.drawContent('HEADER');
	}

	renderFilter() {
		//Console.log(':::', this.props.content.filter(item => item.content_keys?.indexOf('FILTER') >= 0));
		return this.drawContent('FILTER');
	}

	renderSort() {
		return this.drawContent('SORT');
	}

	renderRow(content: iContent) {
		return <Content key={content.id} content={[content]} pageWraper={this.props.pageWraper} session={this.props.session} />;
		//return '???';
	}

	renderList() {
		return this.getChilds().map(item => this.renderRow(item));
	}

	renderError(message: string[]) {
		Console.log('form error!');
		//return <Error content={[Utils.genContent('1', message)]} />;
		return <Content content={Utils.genErrorContent(message)} pageWraper={this.props.pageWraper} session={this.props.session} />;
	}

	renderPages() {

		let settings: Hash<string> = Utils.clone(this.props.settings || {}); // NB!!! здесь именно this.props.settings так как настрйоки пагинатора будут менятся в завимсимости от фильтра и текущей страницы

		// в урл надо добавить параметры фильтра и сортировку списка
		const [not_used_host0, url] = Utils.makeFilterUrl(this.page, this.page, this.site, this.path, '{{PAGE}}', this.refStoreActions.current?.getFilterContentArgs(this.path) || '');
		let filter = '';

		//const [not_used_host, url] = Utils.makeUrl(this.page, this.page, this.site, this.path + '/{{PAGE}}');
		settings.base_url = url;
		//const [not_used_host1, url1] = Utils.makeUrl(this.page, this.page, this.site, '');
		const url1 = url.replace('{{PAGE}}', '0');
		settings.first_url = url1;

		return <Paginator content={[]} pageWraper={this.props.pageWraper} session={this.props.session} settings={settings} />;
	}

	getChilds() {
		return this.props.content.filter(item => item.content_keys?.indexOf('CONTENT') >= 0);
	}

	renderFounded() {
		const countAll = this.props.settings?.total_rows || '0';
		const max_on_page = this.props.settings?.per_page || '0';
		const offset = this.props.settings?.cur_page || '0';
		
		const count = this.getChilds().length;

		return 'Найдено ' + countAll + '.' + (+count > 0 ? ' Показано ' + (+offset * +max_on_page) + ' - ' + (+offset * +max_on_page + +count) : '');
	}

	renderWraps() {
		return <>
			<StoreActionsWrapped ref={this.refStoreActions} />
		</>;
	}

	render() {
		//Console.log('.....', this.props.settings);

		// ошибки компонента! ошибки самой формы покажутся в форме как обычные единицы контента
		if (this.state.error.length > 0) return this.renderError(this.state.error);

		return <>
			{this.renderWraps()}
			{this.renderHeader()}
			{this.renderFilter()}
			{this.renderFounded()}
			{this.renderSort()}
			{this.renderList()}
			{this.renderPages()}
		</>;
	}
}