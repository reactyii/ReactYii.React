import * as React from 'react';
//import { Console, ContentType } from '../../models/commonModels';
import { iContentProps } from '../../models/contentModels';


export class Paginator extends React.Component<iContentProps, {}> {

	render() {
		//Console.log('hhhhhhhhhhhh1', this.props.content);

		// протестируем передачу настроек в компоненты
		if (typeof this.props.settings !== 'undefined' && typeof this.props.settings['align'] !== 'undefined') {

		}

		return <h1>{this.props.children}</h1>;
	}
}