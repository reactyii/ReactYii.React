import * as React from 'react';
import { Utils } from '../helpers/Utils';
import { Console, ContentType } from '../models/commonModels';
import { iContent, iContentProps } from '../models/contentModels';
import { Html } from './Html';
//import { Templates } from './templates';

export class Content extends React.Component<iContentProps, {}> {

	// если у ноды есть childs то возвращаем их, если нет, то создаем ноду из item.content
	// короче childs переопределяет item.content
	protected _prepareChilds(item: iContent): iContent[] {
		//const _content = typeof item.childs !== 'undefined' && item.childs.length > 0 ? item.childs?.filter(item => typeof item.content_keys === 'undefined' || item.content_keys?.indexOf('CONTENT') >= 0) : [];

		// здесь передаем всех child! на надо выбирать только 'CONTENT'
		return typeof item.childs !== 'undefined' && item.childs.length > 0
			? item.childs
			: [{ id: item.id, name: '', content: item.content, priority: 100, content_keys: ['CONTENT'], parent_id: null, path: '', type: null, template: null, template_key: null }];
	}

	render() {

		return this.props.content.map(item => {
			//Console.log('-->', item.type, item.template_key, item.template, item);

			// контент с шаблоном из БД
			if (item.template) {
				//Console.log('==>', item);

				// для простоты (чтобы не делать еще один уровень в дереве) если у ноды нет потомков и есть и шаблон и контент то контент перенесем в потомки
				return <Html key={item.id} html={item.template} data={this._prepareChilds(item)} pageWraper={this.props.pageWraper} session={this.props.session}/>;
			}

			// контент с шаблоном - компонентом реакта
			if (item.template_key) {
				//Console.log('::>', item.template, item.template_key);
				const tkeys: string[] = item.template_key.indexOf(',') >= 0 ? item.template_key.split(',') : [item.template_key];

				for (let i = 0, l = tkeys.length; i < l; i++) {
					let template_key = tkeys[i];

					if (typeof Utils.Templates[template_key] !== 'undefined') {

						// в качестве вложения (this.props.children) передаем сгенеренный item.content, а потомков элемента передаем в пропсах
						// !!!! а может не стоит предавать this.props.children (см ниже "контент потомки") чтобы например переопределить язык
						// не будем предавать ничего через this.props.children
						return React.createElement(Utils.Templates[template_key],
							// в пропсах прокидываем чилдсов и настройки
							{
								content: this._prepareChilds(item), settings: item.settings, key: item.id,
								pageWraper: this.props.pageWraper, session: this.props.session
							},
							null//<Html key={item.id} html={item.content} />
						);
					}
				}
				// не нашли ни одного шаблона с таким именем
				Console.error('Template component "' + item.template_key + '" not founded!');
				return null;
			}

			// контент потомки
			if (typeof item.childs !== 'undefined') {
				// есть внутренние узлы, НО шаблона нет! значит показываем строго 'CONTENT' узлы
				const _childs = item.childs.filter(item => typeof item.content_keys === 'undefined' || item.content_keys?.indexOf('CONTENT') >= 0);
				if (_childs.length > 0) {
					// вот думаю если есть item.content, то надо его передать или нет?
					// НЕ НАДО! так как у нас идет преопределение, например, языка или инфы для раздела
					return <Content key={item.id} content={_childs} pageWraper={this.props.pageWraper} session={this.props.session} />;
				}
			}

			// примитивы 

			// здесь контент как html
			// но https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml мы тут заюзать не сможем, так как вот так не прокатывает < dangerouslySetInnerHTML={{ __html: item.content}}></>
			if (item.type === null) return <Html key={item.id} html={item.content} />;// <span key={item.id} dangerouslySetInnerHTML={{ __html: item.content}}></span>;

			// хм а вот такого наверное не будет так как list у нас всегда с шаблоном (причем сложным) идет (фильтры, пагинатор, сами элементы списка)
			if (item.type === ContentType.List) {

			}

			// допилить другие примитивы ...
			// ...

			if (item.type === ContentType.Html) {
				// вот не знаю. пока data передам пустое, но думаю что можно и this._prepareChilds(item)
				return <Html key={item.id} html={item.content} data={[]} pageWraper={this.props.pageWraper} session={this.props.session} />;
			}

			return item.content; //if (item.type === ContentType.String)
		});
	}
}