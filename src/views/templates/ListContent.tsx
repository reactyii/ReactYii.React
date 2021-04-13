import * as React from 'react';
//import { Console, ContentType } from '../../models/commonModels';
import { iContent, iContentProps } from '../../models/contentModels';
import { List } from './List';

export class ListContent extends List {

	renderRow(content: iContent) {

		return <div key={content.id}>
			<b>{content.id}</b> {content.name}
		</div>;
	}

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