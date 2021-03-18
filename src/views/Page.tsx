import * as React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import {
	Link,
  } from "react-router-dom";
import {
	//Hash, 
	//ContentType,
} from '../models/commonModels';
import { iPageProps} from '../models/pageModels';

export class Page extends React.Component<iPageProps, {}> {
		
	/*constructor(props: iPageProps) {
		super(props);
		this.state = {path: props.newPath};
	}/* */

	// дадим возможность переопределить в шаблонах
	renderSEO() {
		return <HelmetProvider>
			<Helmet title={this.props.pageWraper?.item?.seo.title} />
		</HelmetProvider>;
	}

	render() {
		return (
			<div>
				{this.renderSEO()}
				<h1>Привет, мир! {this.props.pageWraper?.key}</h1>
				{
					(this.props.loadingPath !== '' ? <div>loading... {this.props.loadingPath}</div> : '')
				}
				{
					this.props.pageWraper?.err ? <div>{this.props.pageWraper?.err}</div>: ''
				}
				<Link to="/">Home</Link><br />
				<Link to="/path.html">Path</Link><br />
				<Link to="/ru/aqua/about.html">About</Link><br /><br />
				<Link to="/404.html">404</Link>
			</div>
		);
	}
}