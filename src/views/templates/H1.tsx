import * as React from 'react';
//import { Console, ContentType } from '../../models/commonModels';
import { iContentProps } from '../../models/contentModels';
import { Content } from '../Content';
//import { Html } from '../Html';

type alType = "-moz-initial" | "inherit" | "initial" | "revert" | "unset" | "center" | "end" | "justify" | "left" | "match-parent" | "right" | "start" | undefined;
export class H1 extends React.Component<iContentProps, {}> {

	render() {
		//Console.log('hhhhhhhhhhhh1', this.props.content);

		// не используем this.props.child
		//const content = this.props.children;

		const content = <Content content={this.props.content.filter(item => {
			return typeof item.content_keys === 'undefined' || item.content_keys.indexOf('CONTENT') >= 0;
		})} />

		// протестируем передачу настроек в компоненты
		if (typeof this.props.settings !== 'undefined' && typeof this.props.settings['align'] !== 'undefined') {
			const h1Style = { textAlign: this.props.settings['align'] as alType };
			return <h1 style={h1Style}>{content}</h1>;
		}

		return <h1>{content}</h1>;
	}
}