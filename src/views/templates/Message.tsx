import * as React from 'react';
//import { Console } from '../../models/commonModels';
//import { Console, ContentType } from '../../models/commonModels';
import { iContentProps } from '../../models/contentModels';
//import { Content } from '../Content';
//import { Html } from '../Html';

export class Message extends React.Component<iContentProps, {}> {

	render() {
		//Console.log('hhhhhhhhhhhh1', this.props.content);
		const style = { color: '#00e100' };

		return this.props.content.map(item => {
			return <div key={item.id} style={style} dangerouslySetInnerHTML={{ __html: item.content }}></div>; // могут быть сущности типа &quot;
		});
	}
}