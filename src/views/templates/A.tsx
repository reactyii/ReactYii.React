import * as React from 'react';
//import { Console, ContentType } from '../../models/commonModels';
import { iContentProps } from '../../models/contentModels';
import { Content } from '../Content';
import { Utils } from '../../helpers/Utils';
//import { FormStorage } from '../../helpers/FormStorage';
import { Console, Hash, iSite } from '../../models/commonModels';
import { iPage } from '../../models/pageModels';
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
		return settings.url ? settings.url : ''; // к сожалению урл сюда можно передать тока так, то есть построение урла снаружи
	}

	renderContent(settings: Hash<string>): React.ReactNode {
		const childsContent = this.props.content.filter(item => {
			return typeof item.content_keys === 'undefined' || item.content_keys.indexOf('CONTENT') >= 0;
		});
		Console.log('}}}}}}}}}', settings, childsContent);
		return childsContent.length > 0
			? <Content content={childsContent} pageWraper={this.props.pageWraper} session={this.props.session} />
			: (settings.content ? settings.content : '');
	}

	render() {
		const settings = this.props.settings || {};

		return this.renderA(this.getUrl(settings), this.renderContent(settings), this.getAttrs(settings));
	}
}