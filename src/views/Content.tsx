import * as React from 'react';
import { Console, ContentType } from '../models/commonModels';
import { iContent, iContentProps } from '../models/contentModels';
import { Html } from './Html';
import { Templates } from './templates';

export class Content extends React.Component<iContentProps, {}> {

	render() {

		return this.props.content.map(item => {
			//Console.log('-->', item.type, item.template, item);
			
			if (item.template) { // контент с шаблоном из БД
				Console.log('==>', item);

				let childs: iContent[] = typeof item.childs !== 'undefined' && item.childs.length > 0 ? item.childs : [{ id: item.id, type:null, name: '', content: item.content, priority: 100, content_keys: ['CONTENT'], parent_id: null, path: '' } as iContent];
				return <Html key={item.id} html={item.template} data={childs} />;
			}

			if (item.template_key) {
				//Console.log('::>', item.template, item.template_key);
				//return '...' + item.template_key;
				if (typeof Templates[item.template_key] !== 'undefined') {

					// в качестве вложение передаем сгенеренный item.content, а потомков элемента передаем в пропсах
					return React.createElement(Templates[item.template_key],
						// в пропсах прокидываем чилдсов и настройки
						{ content: item.childs, settings: item.settings, key: item.id },
						<Html key={item.id} html={item.content} />
					);
				} else {
					Console.error('Template body is empty and template component not founded!');
					return null;
					//return '!!!!!!!!!!!';
				}
			}

			if (typeof item.childs !== 'undefined' && item.childs.length > 0) return <Content key={item.id} content={item.childs} />;

			// здесь контент как html
			if (item.type === null) return <Html key={item.id} html={item.content} />;//item.content;
			if (item.type === ContentType.String) return item.content;
			// допилить другие примитивы ...

			return '';
		});
	}
}