import * as React from 'react';
//import { Console, ContentType } from '../../models/commonModels';
import { iContentProps } from '../../models/contentModels';
import { Content } from '../Content';
//import { Html } from '../Html';

export class Error extends React.Component<iContentProps, {}> {

	render() {
		//Console.log('hhhhhhhhhhhh1', this.props.content);
		const style = {color:'#e10000'};
		return this.props.content.map(item => {
			return <div key={item.id} style={style}>{item.content}</div>
		});
	}
}