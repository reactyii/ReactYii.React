import * as React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

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
				<HelmetProvider>
					<Helmet title={this.props.page?.item?.seo.title ?? ''} />
				</HelmetProvider>
				<h1>Привет, мир! {this.props.page?.key}</h1>
				<Link to="/">Home</Link><br />
				<Link to="/path.html">Path</Link><br />
				<Link to="/ru/aqua/about.html">About</Link><br /><br />
				<Link to="/404.html">404</Link>
			</div>
		);
	}
}