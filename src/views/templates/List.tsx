import * as React from 'react';
import { Console } from '../../models/commonModels';
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
		return this.drawContent('FILTER');
	}

	renderRow(content: iContent) {
		return <Content key={content.id} content={[content]} pageWraper={this.props.pageWraper} session={this.props.session} />;
		//return '???';
	}

	renderList() {
		return this.getChilds().map(item => this.renderRow(item));
	}

	renderPages() {
		return <Paginator content={[]} pageWraper={this.props.pageWraper} session={this.props.session} settings={this.props.settings} />;
	}

	getChilds() {
		return this.props.content.filter(item => item.content_keys?.indexOf('CONTENT') >= 0);
	}

	renderFounded() {
		const countAll = this.props.settings?.count || '0';
		const max_on_page = this.props.settings?.max_on_page || '0';
		const offset = this.props.settings?.offset || '0';
		
		const count = this.getChilds().length;

		return 'Найдено ' + countAll + '.' + (+count > 0 ? ' Показано ' + (+offset * +max_on_page) + ' - ' + (+offset * +max_on_page + +count) : '');
	}

	render() {
		//Console.log('.....', this.props.settings);
		return <>
			{this.renderHeader()}
			{this.renderFilter()}
			{this.renderFounded()}
			{this.renderList()}
			{this.renderPages()}
		</>;
	}
}