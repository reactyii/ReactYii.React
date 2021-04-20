import * as React from 'react';
import { Utils } from '../../helpers/Utils';
import { Console, Hash } from '../../models/commonModels';
//import { Console, ContentType } from '../../models/commonModels';
import { iContent, iContentProps } from '../../models/contentModels';
import { Content } from '../Content';
import { Paginator } from './Paginator';


export class List extends React.Component<iContentProps, {}> {

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

	renderPages() {
		if (typeof this.props.settings === 'undefined') return null;
		if (typeof this.props.pageWraper?.item === 'undefined' || this.props.pageWraper?.item === null) return null;
		if (typeof this.props.session?.site === 'undefined') return null;

		let settings: Hash<string> = Utils.clone(this.props.settings);
		const [not_used_host, url] = Utils.makeUrl(this.props.pageWraper.item, this.props.pageWraper.item, this.props.session.site, settings.path + '/{{PAGE}}');
		settings.base_url = url;
		const [not_used_host1, url1] = Utils.makeUrl(this.props.pageWraper.item, this.props.pageWraper.item, this.props.session.site, '');
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

	render() {
		//Console.log('.....', this.props.settings);
		return <>
			{this.renderHeader()}
			{this.renderFilter()}
			{this.renderFounded()}
			{this.renderSort()}
			{this.renderList()}
			{this.renderPages()}
		</>;
	}
}