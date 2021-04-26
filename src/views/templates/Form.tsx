import * as React from 'react';
//import { Console, ContentType } from '../../models/commonModels';
import { iContentProps } from '../../models/contentModels';
import { Content } from '../Content';
import { Error } from './Error';
import { Utils } from '../../helpers/Utils';
import { FormStorage } from '../../helpers/FormStorage';
import { Console, Hash, iSite } from '../../models/commonModels';
import { iPage } from '../../models/pageModels';
import { Redirect, withRouter } from 'react-router-dom';
import StoreActionsWrapped from '../../features/page/StoreActionsWrapped';
import { StoreActions } from '../../features/page/StoreActions';
import RouterWrapped from '../../features/page/RouterWrapped';
import { Router } from '../../features/page/Router';
//import { Html } from '../Html';
interface iFormState {

	// в идеале можно сделать отправку формы фильтров через Redirect компонент,
	// НО компонент страницы не пересоздается и форма тоже. в итоге после редиректа имеем установленный стэйт с редиректом и скинуть его проблематично
	// опять же можно в componentDidUpdate проверять, а равен ли урл текущему (а чтоб узнать текущий урл нам нужен location который в Router)
	//redirectto?: string;

	error: string[];
}

export class Form extends React.Component<iContentProps, iFormState> {
	formname: string;
	method: string;
	site: iSite;
	page: iPage;
	settings: Hash<string>; // пока предполагаем что настройки формы не изменятся во время жизни на странице
	refStoreActions: React.RefObject<StoreActions>;
	refRouter: React.RefObject<Router>;

	constructor(props: iContentProps) {
		super(props);

		let error: string[] = Utils.checkContentProps(props, ['formname']);

		// вызов формы без этих параметров ошибка конфигурации
		this.settings = props.settings || {};
		this.site = props.session?.site as iSite;
		this.page = props.pageWraper?.item as iPage;
		this.formname = props.settings?.formname || 'unknown'; // так как инит формы в конструкторе (ошибку мы покажем в рендере)
		this.method = typeof props.settings?.method !== 'undefined' ? props.settings['method'] : 'post';

		//error = ['test error', '1123'];

		this.state = { error };

		//Console.log('.....', props.settings);

		FormStorage.initForm(this.formname);

		this.handleSubmit = this.handleSubmit.bind(this);

		//const ref = React.createRef<StoreActions>();
		this.refStoreActions = React.createRef<StoreActions>();
		this.refRouter = React.createRef<Router>();


	}/* */

	handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
		if (this.method === 'get') { // делаем редирект
			const url = this.getActionUrl(FormStorage.getFilterContentArgs(this.formname));
			//Console.log('redirect to:', url);
			event.preventDefault();
			event.stopPropagation();
			//return false;

			//this.setState({ redirectto: url });
			//if (this.refStoreActions?.current !== null) this.refStoreActions.current.loadPage(url);

			if (this.refRouter?.current !== null) this.refRouter.current.historyPush(url);
			//Console.log('this.refRouter=', this.refRouter);

			return false;/**/
		} else {
			// отправка поста
			//Console.log('redirect to:', url, this.refStoreActions?.current);
			if (this.refStoreActions?.current !== null) this.refStoreActions?.current.submitForm('!!!!!!!!!!');
		}
	}

	getActionUrl(filter: string): string {
		const settings: Hash<string> = this.props.settings as Hash<string>; // проверка на undef была в render()
		// напоминание у нас другой host может быть тока на другом разделе и мы пока предполагаем что форма и ее сабмит на одном и том же разделе
		//const [not_used_host, url] = Utils.makeUrl(this.props.pageWraper?.item as iPage, this.props.pageWraper?.item as iPage, this.props.session?.site as iSite, settings.path); // + '/{{PAGE}}'
		const [not_used_host, url] = Utils.makeUrl(this.page, this.page, this.site, settings.path + (filter ? '/0/' + filter : '')); // + '/{{PAGE}}'
		return url;
	}

	renderError(message: string[]) {
		Console.log('form error!');
		//return <Error content={[Utils.genContent('1', message)]} />;
		return <Content content={Utils.genErrorContent(message)} pageWraper={this.props.pageWraper} session={this.props.session} />;
	}

	renderWraps() {
		return <>
			<StoreActionsWrapped ref={this.refStoreActions} />
			<RouterWrapped ref={this.refRouter} />
		</>;
	}
	renderForm(action: string, method: string, content: React.ReactNode) {
		return <form action={action} method={method} onSubmit={this.handleSubmit}>
			{this.renderWraps()}
			{content}
		</form>;
	}

	render() {
		//Console.log('hhhhhhhhhhhh1', this.state.redirectto);

		// ошибки компонента! ошибки самой формы покажутся в форме как обычные единицы контента
		if (this.state.error.length > 0) return this.renderError(this.state.error);

		//if (typeof this.state.redirectto !== 'undefined') return <Redirect push to={this.state.redirectto} />;

		// блок с копипиздой проверка всех настроек и загрузок (если у формы нет настроек или страница не загружена, то скипаем форму)
		//if (typeof this.props.settings === 'undefined') return 'Error';
		//if (typeof this.props.pageWraper?.item === 'undefined' || this.props.pageWraper?.item === null) return 'Error';
		//if (typeof this.props.session?.site === 'undefined') return 'Error';

		//const settings: Hash<string> = this.props.settings;

		const content = <Content key="formcontent" content={this.props.content.filter(item => {
			return typeof item.content_keys === 'undefined' || item.content_keys.indexOf('CONTENT') >= 0;
		})} pageWraper={this.props.pageWraper} session={this.props.session} />

		return this.renderForm(this.getActionUrl(''), this.method, content);
	}
}

//export default withRouter(Form);