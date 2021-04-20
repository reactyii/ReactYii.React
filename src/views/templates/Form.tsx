import * as React from 'react';
//import { Console, ContentType } from '../../models/commonModels';
import { iContentProps } from '../../models/contentModels';
import { Content } from '../Content';
import { Utils } from '../../helpers/Utils';
import { FormStorage } from '../../helpers/FormStorage';
import { Console, Hash, iSite } from '../../models/commonModels';
import { iPage } from '../../models/pageModels';
import { Redirect } from 'react-router-dom';
//import { Html } from '../Html';
interface iFormState {
	redirectto?: string;
}

export class Form extends React.Component<iContentProps, iFormState> {
	formname: string;
	method: string;
	site: iSite;
	page: iPage;

	constructor(props: iContentProps) {
		super(props);
		this.state = { redirectto: undefined };

		Console.log('.....', props.settings);

		// вызов формы без этих параметров ошибка конфигурации
		this.site = props.session?.site as iSite;
		this.page = props.pageWraper?.item as iPage;
		this.formname = props.settings?.formname as string;
		this.method = typeof props.settings?.method !== 'undefined' ? props.settings['method'] : 'post';

		FormStorage.initForm(this.formname);

		this.handleSubmit = this.handleSubmit.bind(this);
	}/* */

	handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
		if (this.method === 'get') { // делаем редирект
			const url = this.get_action_url(FormStorage.getFilterContentArgs(this.formname));
			//Console.log('redirect to:', url);
			this.setState({ redirectto: url });
			event.preventDefault();
			event.stopPropagation();
			return false;
		} else {
			// отправка поста
		}
	}

	get_action_url(filter: string): string {
		const settings: Hash<string> = this.props.settings as Hash<string>; // проверка на undef была в render()
		// напоминание у нас другой host может быть тока на другом разделе и мы пока предполагаем что форма и ее сабмит на одном и том же разделе
		//const [not_used_host, url] = Utils.makeUrl(this.props.pageWraper?.item as iPage, this.props.pageWraper?.item as iPage, this.props.session?.site as iSite, settings.path); // + '/{{PAGE}}'
		const [not_used_host, url] = Utils.makeUrl(this.page, this.page, this.site, settings.path + (filter ? '/0/' + filter : '')); // + '/{{PAGE}}'
		return url;
	}

	render_form(action: string, method: string, content: React.ReactNode) {
		return <form action={action} method={method} onSubmit={this.handleSubmit}>{content}</form>;
	}

	render() {
		//Console.log('hhhhhhhhhhhh1', this.props.content);
		if (typeof this.state.redirectto !== 'undefined') return <Redirect push to={this.state.redirectto} />;

		// блок с копипиздой проверка всех настроек и загрузок (если у формы нет настроек или страница не загружена, то скипаем форму)
		if (typeof this.props.settings === 'undefined') return 'Error';
		if (typeof this.props.pageWraper?.item === 'undefined' || this.props.pageWraper?.item === null) return 'Error';
		if (typeof this.props.session?.site === 'undefined') return 'Error';

		//const settings: Hash<string> = this.props.settings;

		const content = <Content key="formcontent" content={this.props.content.filter(item => {
			return typeof item.content_keys === 'undefined' || item.content_keys.indexOf('CONTENT') >= 0;
		})} pageWraper={this.props.pageWraper} session={this.props.session} />

		return this.render_form(this.get_action_url(''), this.method, content);
	}
}