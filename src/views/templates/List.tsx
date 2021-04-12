import * as React from 'react';
//import { Console, ContentType } from '../../models/commonModels';
import { iContent, iContentProps } from '../../models/contentModels';


export class List extends React.Component<iContentProps, {}> {

	renderHeader(content: iContent[]) {

	}

	renderRow() {

	}

	renderCell() {

	}

	renderPages() {

	}

	renderFounded() {

	}

	render() {
		
		return <>
			!!!!
			{this.renderHeader(this.props.content.filter(item => item.content_keys?.indexOf('HEADER') >= 0))}
			{}
		</>;
	}
}