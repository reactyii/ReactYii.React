import * as React from 'react';
import { Templates } from '.';
import { StoreActions } from '../../features/page/StoreActions';
import StoreActionsWrapped from '../../features/page/StoreActionsWrapped';
import { Utils } from '../../helpers/Utils';
import { Console, ContentType, Hash, iSite } from '../../models/commonModels';
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
	// не будем странциу засовывать в свойства компонента, страница меняется в течении жизни компонента
	//page: iPage;
	// не будем использовать! так как настройки (в частности пагинатора) будут меняться
	//settings: Hash<string>; // NB!!! использваоть тока для фиксированных свойств, например "path"! 
	//refStoreActions: React.RefObject<StoreActions>;

	constructor(props: iContentProps) {
		super(props);

		let error: string[] = Utils.checkContentProps(props, ['path']);

		// вызов формы без этих параметров ошибка конфигурации
		//this.settings = props.settings || {};
		this.site = props.session?.site as iSite;
		//this.page = props.pageWraper?.item as iPage;

		// так как фильтр нам нужен и в списке! то юзаем вместе имени формы path
		this.path = this.props.settings?.path || 'unknown'; // path у списка не меняется

		//error = ['test error', '1123'];

		this.state = { error };

		//Console.log('.....', props.settings);

		//this.refStoreActions = React.createRef<StoreActions>();

	}/* */

	/*componentDidMount() {
		// форму инициализирует и список! так как сортировка будет храниться тоже в форме, а фильтра может не быть!
		this.refStoreActions.current?.initForm(this.path);
	}/**/


	renderContent(key: string): React.ReactNode {
		const content = this.props.content.filter(item => item.content_keys?.indexOf(key) >= 0);
		if (content.length === 0) return null;
		return <Content content={content} pageWraper={this.props.pageWraper} session={this.props.session} />;
	}
	renderHeader(): React.ReactNode {
		return this.renderContent('HEADER');
	}

	renderFilter(): React.ReactNode {
		//Console.log(':::', this.props.content.filter(item => item.content_keys?.indexOf('FILTER') >= 0));
		return this.renderContent('FILTER');
	}

	renderSort(): React.ReactNode {
		return this.renderContent('SORT');
	}
	renderBefore(): React.ReactNode {
		return this.renderContent('BEFORE');
	}
	renderAfter(): React.ReactNode {
		return this.renderContent('AFTER');
	}
	/**
	 * Делаем копию единицы контента ссылки на добавление так как нам нужно сформировать корректный урл (бэкенд не сильно разбирается как формировать урлы)
	 * просто заменить settings.url не получится так как идет передача по "ссылке" и нельзя изменить объект в сторе редукса (если короче, то content is readonly)
	 * 
	 * @param content
	 */
	private _cloneAddLink(content: iContent): iContent {
		if (content.type !== ContentType.Link) return content;

		const url = '#!';
		const _content = Utils.clone(content);
		if (typeof _content.settings === 'undefined') {
			_content.settings = { url };
		} else {
			_content.settings.url = url;
		}
		return _content;
	}
	renderLinkAdd(): React.ReactNode {
		// надо сформирвоать url
		const content = this.props.content.filter(item => item.content_keys?.indexOf('LINKADD') >= 0);
		if (content.length === 0) return null;

		const newContent: iContent[] = [];
		for (let i = 0, l = content.length; i < l; i++) {
			newContent.push(this._cloneAddLink(content[i]));
			//Console.log('>>>', newContent[i].settings);
		}

		return <Content content={newContent} pageWraper={this.props.pageWraper} session={this.props.session} />;
		//return this.renderContent('LINKADD');
	}

	renderRow(content: iContent): React.ReactNode{
		return <Content key={content.id} content={[content]} pageWraper={this.props.pageWraper} session={this.props.session} />;
		//return '???';
	}

	renderList(): React.ReactNode {
		return this.getChilds().map(item => this.renderRow(item));
	}

	renderError(message: string[]): React.ReactNode {
		Console.log('form error!');
		//return <Error content={[Utils.genContent('1', message)]} />;
		return <Content content={Utils.genErrorContent(message)} pageWraper={this.props.pageWraper} session={this.props.session} />;
	}

	getSettingsForPages() {
		const settings: Hash<string> = Utils.clone(this.props.settings || {}); // NB!!! здесь именно this.props.settings так как настрйоки пагинатора будут менятся в завимсимости от фильтра и текущей страницы

		// в урл надо добавить параметры фильтра и сортировку списка
		//const [not_used_host0, url] = Utils.makeFilterUrl(this.page, this.page, this.site, this.path, '{{PAGE}}', this.refStoreActions.current?.getFilterContentArgs(this.path) || '');
		const page = this.props.pageWraper?.item as iPage;
		const [not_used_host0, url] = Utils.makeFilterUrl(page, page, this.site, this.path, '{{PAGE}}', Utils.getFilterContentArgs(this.path, page.forms || {}) || '');
		//let filter = '';

		//const [not_used_host, url] = Utils.makeUrl(this.page, this.page, this.site, this.path + '/{{PAGE}}');
		settings.base_url = url;
		//const [not_used_host1, url1] = Utils.makeUrl(this.page, this.page, this.site, '');
		const url1 = url.replace('{{PAGE}}', '0');
		settings.first_url = url1;

		return settings;

	}
	renderPages(): React.ReactNode {

		const settings = this.getSettingsForPages();

		// НЕ ДЕЛАТЬ ТАК! так как таким макаром мы не сможем поменять отрисовку пагинатора у потомка
		//return <Paginator content={[]} pageWraper={this.props.pageWraper} session={this.props.session} settings={settings} />;
		// вот так  мы и встаивм Paginator именно из шаблона
		const pc = Utils.genContent('-111', '', 'Paginator');
		pc.settings = settings;
		return <Content content={[pc]} pageWraper={this.props.pageWraper} session={this.props.session} />;
	}

	getChilds(): iContent[] {
		return this.props.content.filter(item => item.content_keys?.indexOf('CONTENT') >= 0);
	}

	renderFounded(): React.ReactNode {
		const countAll = this.props.settings?.total_rows || '0';
		const max_on_page = this.props.settings?.per_page || '0';
		const offset = this.props.settings?.cur_page || '0';
		
		const count = this.getChilds().length;

		return 'Найдено ' + countAll + '.' + (+count > 0 ? ' Показано ' + (+offset * +max_on_page) + ' - ' + (+offset * +max_on_page + +count) : '');
	}

	renderWraps(): React.ReactNode {
		return [];
		/*return <>
			<StoreActionsWrapped ref={this.refStoreActions} />
		</>;/**/
	}

	render() {
		//Console.log('.....', this.props.settings);

		// ошибки компонента! ошибки самой формы покажутся в форме как обычные единицы контента
		if (this.state.error.length > 0) return this.renderError(this.state.error);

		return <>
			{this.renderWraps()}
			{this.renderHeader()}
			{this.renderBefore()}
			{this.renderFilter()}
			{this.renderFounded()}
			{this.renderSort()}
			{this.renderList()}
			{this.renderPages()}
			{this.renderLinkAdd()}
			{this.renderAfter()}
		</>;
	}
}