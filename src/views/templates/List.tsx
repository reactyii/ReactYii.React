import * as React from 'react';
//import { Templates } from '.';
//import { StoreActions } from '../../features/page/StoreActions';
//import StoreActionsWrapped from '../../features/page/StoreActionsWrapped';
import { Utils } from '../../helpers/Utils';
import { ContentType, Hash, iSite } from '../../models/commonModels';
//import { Console, ContentType } from '../../models/commonModels';
import { iContent, iContentProps } from '../../models/contentModels';
import { iPage } from '../../models/pageModels';
import { Content } from '../Content';
//import { Paginator } from './Paginator';
import { BaseComponent } from './BaseComponent';

export interface iListState {

	error: string[];
}

export class List extends BaseComponent<iContentProps, iListState> {
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

	renderHeader(): React.ReactNode {
		return this.renderContentByKey('HEADER');
	}

	renderFilter(): React.ReactNode {
		//Console.log(':::', this.props.content.filter(item => item.content_keys?.indexOf('FILTER') >= 0));
		return this.renderContentByKey('FILTER');
	}

	renderSort(): React.ReactNode {
		return this.renderContentByKey('SORT');
	}
	renderBefore(): React.ReactNode {
		return this.renderContentByKey('BEFORE');
	}
	renderAfter(): React.ReactNode {
		return this.renderContentByKey('AFTER');
	}
	/**
	 * Делаем копию единицы контента ссылки на добавление так как нам нужно сформировать корректный урл (бэкенд не сильно разбирается как формировать урлы)
	 * просто заменить settings.url не получится так как идет передача по "ссылке" и нельзя изменить объект в сторе редукса (если короче, то content is readonly)
	 * 
	 * @param content
	 */
	protected _cloneAddEditLink(content: iContent, id: string = '0'): iContent {
		if (content.type !== ContentType.LinkAdd && content.type !== ContentType.LinkEdit) return content;

		const page = this.props.pageWraper?.item as iPage;
		const [, url] = Utils.makeFilterUrl(page, page, this.site, this.path, '', '__edit/' + id);
		const _content = Utils.clone(content);
		if (typeof _content.settings === 'undefined') {
			_content.settings = { url };
		} else {
			_content.settings.url = url;
		}
		return _content;
	}
	renderLinkAddEdit(childs:iContent[], action: string = 'ADD', id: string = '0'): React.ReactNode {
		// надо сформирвоать url
		const content = childs.filter(item => item.content_keys?.indexOf('LINK' + action) >= 0);
		//Console.log('renderLinkAddEdit() content=', content, action);
		//Console.log('renderLinkAddEdit() childs=', this.props.content, action);
		
		if (content.length === 0) return null;

		const newContent: iContent[] = [];
		for (let i = 0, l = content.length; i < l; i++) {
			newContent.push(this._cloneAddEditLink(content[i], id));
			//Console.log('>>>', newContent[i].settings);
		}

		return <Content content={newContent} pageWraper={this.props.pageWraper} session={this.props.session} />;
		//return this.renderContent('LINKADD');
	}

	renderRow(content: iContent): React.ReactNode{
		const linkEdit = this.renderLinkAddEdit(content?.childs || [], 'EDIT', content.id);

		/*const _content = typeof content.childs !== 'undefined' && content.childs.length > 0
			? content.childs?.filter(item => typeof item.content_keys === 'undefined' || item.content_keys?.indexOf('CONTENT') >= 0)
			: [{ id: content.id, name: '', content: content.content, priority: 100, content_keys: ['CONTENT'], parent_id: null, path: '', type: null, template: null, template_key: null }];
		/**/

		//Console.log('renderRow content=', content);
		const c = <Content key={content.id} content={[content]} pageWraper={this.props.pageWraper} session={this.props.session} />;
		// по умолчанию если есть линк на редактирование, то сунем его вправо и обернем все div-ами. в реальных преопределениях все равно переопределим эту функцию
		//Console.log('linkEdit=', linkEdit);
		
		return linkEdit !== null ? <div key={content.id}><div style={{ float: 'right' }}>{linkEdit}</div>{c}</div> : c;
		//return '???';
	}

	renderList(): React.ReactNode {
		//Console.log('-=-=-=-=  renderList()');
		return this.getContentByKey().map(item => this.renderRow(item));
	}

	getSettingsForPages() {
		const settings: Hash<string> = Utils.clone(this.props.settings || {}); // NB!!! здесь именно this.props.settings так как настрйоки пагинатора будут менятся в завимсимости от фильтра и текущей страницы

		// в урл надо добавить параметры фильтра и сортировку списка
		const page = this.props.pageWraper?.item as iPage;
		const [, url] = Utils.makeFilterUrl(page, page, this.site, this.path, '{{PAGE}}', Utils.getFilterContentArgs(this.path, page.forms || {}) || '');
		
		settings.base_url = url;
		const url1 = url.replace('{{PAGE}}', '0');
		settings.first_url = url1;

		return settings;

	}
	renderPages(): React.ReactNode {

		const settings = this.getSettingsForPages();

		// НЕ ДЕЛАТЬ ТАК! так как таким макаром мы не сможем поменять отрисовку пагинатора у потомка
		//return <Paginator content={[]} pageWraper={this.props.pageWraper} session={this.props.session} settings={settings} />;
		// вот так  мы и вставим Paginator именно из шаблона
		const pc = Utils.genContent('Paginator', '', 'Paginator');
		pc.settings = settings;
		return <Content content={[pc]} pageWraper={this.props.pageWraper} session={this.props.session} />;
	}


	renderFounded(): React.ReactNode {
		const countAll = this.props.settings?.total_rows || '0';
		const max_on_page = this.props.settings?.per_page || '0';
		const offset = this.props.settings?.cur_page || '0';
		
		const count = this.getContentByKey().length;

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
			{this.renderLinkAddEdit(this.props.content)}
			{this.renderAfter()}
		</>;
	}
}