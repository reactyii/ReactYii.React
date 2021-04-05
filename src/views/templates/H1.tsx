import * as React from 'react';
import { Console, ContentType } from '../../models/commonModels';
import { iContentProps } from '../../models/contentModels';

export class H1 extends React.Component<iContentProps, {}> {

	render() {
		//Console.log('hhhhhhhhhhhh1', this.props.content);
		return <h1>{this.props.children}</h1>;
	}
}