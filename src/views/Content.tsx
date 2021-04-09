import * as React from 'react';
import { Console, ContentType } from '../models/commonModels';
import { iContent, iContentProps } from '../models/contentModels';
import { Html } from './Html';
import { Templates } from './templates';

export class Content extends React.Component<iContentProps, {}> {

	// если у ноды есть childs то возвращаем их, если нет, то создаем ноду из item.content
	// короче childs переопределяет item.content
	protected _prepareChilds(item: iContent): iContent[] {
		return typeof item.childs !== 'undefined' && item.childs.length > 0
			? item.childs :
			[{ id: item.id, name: '', content: item.content, priority: 100, content_keys: ['CONTENT'], parent_id: null, path: '', type: null, template: null, template_key: null }];
	}

	render() {

		return this.props.content.map(item => {
			//Console.log('-->', item.type, item.template, item);

			// контент с шаблоном из БД
			if (item.template) {
				//Console.log('==>', item);

				// для простоты (чтобы не делать еще оин уровень в дереве) если у ноды нет потомков и есть и шаблон и контент то контент перенесем в потомки
				return <Html key={item.id} html={item.template} data={this._prepareChilds(item)} />;
			}

			// контент с шаблоном - компонентом реакта
			if (item.template_key) {
				//Console.log('::>', item.template, item.template_key);

				if (typeof Templates[item.template_key] !== 'undefined') {

					// в качестве вложения (this.props.children) передаем сгенеренный item.content, а потомков элемента передаем в пропсах
					// !!!! а может не стоит предавать this.props.children (см ниже "контент потомки") чтобы например переопределить язык
					// не будем предавать ничего через this.props.children
					return React.createElement(Templates[item.template_key],
						// в пропсах прокидываем чилдсов и настройки
						{ content: this._prepareChilds(item), settings: item.settings, key: item.id },
						null//<Html key={item.id} html={item.content} />
					);
				} else {
					Console.error('Template component not founded!');
					return null;
				}
			}

			// контент потомки
			if (typeof item.childs !== 'undefined' && item.childs.length > 0) {
				// вот думаю если есть item.content, то надо его передать или нет?
				// НЕ НАДО! так как у нас идет преопределение, например, языка или инфы для раздела
				return <Content key={item.id} content={item.childs} />;
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

			return item.content; //if (item.type === ContentType.String)
		});
	}
}