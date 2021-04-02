import * as React from 'react';
import { Console } from '../models/commonModels';
import { iContentProps } from '../models/contentModels';
import { Html } from './Html';

export class Content extends React.Component<iContentProps, {}> {

	render() {

		return this.props.content.map(item => {
			Console.log(item);
			if (typeof item.childs !== 'undefined' && item.childs.length > 0) return <Content key={item.id} content={item.childs} />;
			if (item.type == null) return <Html html={item.content} />;//item.content;
		});
	}
}