import * as React from 'react';
//import { Console, ContentType } from '../../models/commonModels';
import { iContentProps } from '../../models/contentModels';
import { Content } from '../Content';
//import { Utils } from '../../helpers/Utils';
//import { FormStorage } from '../../helpers/FormStorage';
import { Console, Hash, iMenu } from '../../models/commonModels';
import { Utils } from '../../helpers/Utils';
//import { iPage } from '../../models/pageModels';
//import { Html } from '../Html';

export class A extends React.Component<iContentProps, {}> {

	renderA(url: string, content: React.ReactNode, attrs: React.AnchorHTMLAttributes<HTMLAnchorElement> = {}): React.ReactNode {
		return <a href={url} {...attrs}>{content}</a>;
	}

	getAttrs(settings: Hash<string>): React.AnchorHTMLAttributes<HTMLAnchorElement> {
		const attrs: React.AnchorHTMLAttributes<HTMLAnchorElement> = {};
		if (settings.target) attrs.target = settings.target;
		if (settings.className) attrs.className = settings.className;
		return attrs;
	}

	getUrl(settings: Hash<string>): string {
		if (settings.url) return settings.url;
		//return settings.url ? settings.url : ''; // к сожалению урл сюда можно передать тока так, то есть построение урла снаружи
		if (
			typeof this.props.pageWraper?.item === 'undefined' || this.props.pageWraper?.item === null
			|| typeof this.props.settings === 'undefined'
			|| typeof this.props.session?.site === 'undefined'
		) {
			Console.error('error format url')
			return '#unknown';
		}

		const new_page: iMenu = {
			path: this.props.settings.path,
			section_id: this.props.settings.section_id,
			is_current_section: this.props.settings.is_current_section === '1',
			is_all_section: this.props.settings.is_all_section === '1',

			// not used in function Utils.makeUrl
			id: '', name: '', menu_name: '', childs:[]
		};
		
		const [host, url] = Utils.makeUrl(this.props.pageWraper.item, new_page, this.props.session.site);

		const [current_host,] = Utils.makeUrl(this.props.pageWraper.item, this.props.pageWraper.item, this.props.session.site);

		Console.log('new_page=', this.props.settings, new_page, url);

		return host !== current_host ? '//' + host + url : url;
	}

	renderContent(settings: Hash<string>): React.ReactNode {
		const childsContent = this.props.content.filter(item => {
			return typeof item.content_keys === 'undefined' || item.content_keys.indexOf('CONTENT') >= 0;
		});
		//Console.log('}}}}}}}}}', settings, childsContent);
		return childsContent.length > 0
			? <Content content={childsContent} pageWraper={this.props.pageWraper} session={this.props.session} />
			: (settings.content ? settings.content : '');
	}

	render() {
		const settings = this.props.settings || {};

		return this.renderA(this.getUrl(settings), this.renderContent(settings), this.getAttrs(settings));
	}
}