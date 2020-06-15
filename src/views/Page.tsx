import * as React from 'react';

import {
	Link,
  } from "react-router-dom";
import {
	//Hash, 
	//ContentType,
} from '../models/commonModels';
import {iPageProps} from '../models/pageModels';

export class Page extends React.Component<iPageProps, {}> {
		
	/*constructor(props: iPageProps) {
		super(props);
		this.state = {path: props.newPath};
	}/* */

	render() {
		return (
			<div>
				<h1>Привет, мир! {this.props.page?.path}</h1>
				<Link to="/path.html">Path</Link><br/>
				<Link to="/ru/aqua/about.html">About</Link>
			</div>
		);
	}
}