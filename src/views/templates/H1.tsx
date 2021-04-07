import * as React from 'react';
//import { Console, ContentType } from '../../models/commonModels';
import { iContentProps } from '../../models/contentModels';

type alType = "-moz-initial" | "inherit" | "initial" | "revert" | "unset" | "center" | "end" | "justify" | "left" | "match-parent" | "right" | "start" | undefined;
export class H1 extends React.Component<iContentProps, {}> {

	render() {
		//Console.log('hhhhhhhhhhhh1', this.props.content);

		// протестируем передачу настроек в компоненты
		if (typeof this.props.settings !== 'undefined' && typeof this.props.settings['align'] !== 'undefined') {
			const h1Style = { textAlign: this.props.settings['align'] as alType };
			return <h1 style={h1Style}>{this.props.children}</h1>;
		}

		return <h1>{this.props.children}</h1>;
	}
}