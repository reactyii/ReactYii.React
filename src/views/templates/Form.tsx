import * as React from 'react';
//import { Console, ContentType } from '../../models/commonModels';
import { iContentProps } from '../../models/contentModels';
import { Content } from '../Content';
import { Utils } from '../../helpers/Utils';
import { FormStorage } from '../../helpers/FormStorage';
import { Hash, iSite } from '../../models/commonModels';
import { iPage } from '../../models/pageModels';
//import { Html } from '../Html';

export class Form extends React.Component<iContentProps, {}> {
	constructor(props: iContentProps) {
		super(props);
		//this.state = {path: props.newPath};

		if (typeof this.props.settings === 'undefined') return;
		FormStorage.initForm(this.props.settings['formname']);
	}/* */

	get_action_url(): string {
		const settings: Hash<string> = this.props.settings as Hash<string>; // проверка на undef была в render()
		// напоминание у нас другой host может быть тока на другом разделе и мы пока предполагаем что форма и ее сабмит на одном и том же разделе
		const [not_used_host, url] = Utils.makeUrl(this.props.pageWraper?.item as iPage, this.props.pageWraper?.item as iPage, this.props.session?.site as iSite, settings.path); // + '/{{PAGE}}'
		return url;
	}

	render_form(action: string, method: string, content: React.ReactNode) {
		return <form action={action} method={method}>{content}</form>;
	}

	render() {
		//Console.log('hhhhhhhhhhhh1', this.props.content);

		// блок с копипиздой проверка всех настроек и загрузок (если у формы нет настроек или страница не загружена, то скипаем форму)
		if (typeof this.props.settings === 'undefined') return '';
		if (typeof this.props.pageWraper?.item === 'undefined' || this.props.pageWraper?.item === null) return '';
		if (typeof this.props.session?.site === 'undefined') return '';

		const settings: Hash<string> = this.props.settings;

		const content = <Content content={this.props.content.filter(item => {
			return typeof item.content_keys === 'undefined' || item.content_keys.indexOf('CONTENT') >= 0;
		})} pageWraper={this.props.pageWraper} session={this.props.session} />

		return this.render_form(this.get_action_url(), typeof settings['method'] !== 'undefined' ? settings['method'] : 'post', content);
	}
}