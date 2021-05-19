import * as React from 'react';
//import { Console, ContentType } from '../../models/commonModels';
import { iContent } from '../../models/contentModels';
import { List } from './List';

export class ListContent extends List {

	renderRow(content: iContent) {
		const linkEdit = this.renderLinkAddEdit(content?.childs || [], 'EDIT', content.id);

		return <div key={content.id}>
			<div style={{ float: 'right' }}>{linkEdit}</div>
			<b>{content.id}</b> {content.name}
		</div>;
	}/**/

/*	renderHeader(content: iContent[]) {

	}

	renderRow(content: iContent[]) {

	}

	renderCell() {

	}

	renderPages() {

	}

	renderFounded() {

	}

	render() {
		//Console.log('hhhhhhhhhhhh1', this.props.content);

		// протестируем передачу настроек в компоненты
		if (typeof this.props.settings !== 'undefined' && typeof this.props.settings['align'] !== 'undefined') {

		}

		return <h1></h1>;
	}/**/
}