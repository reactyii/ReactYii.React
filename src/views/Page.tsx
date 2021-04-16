import * as React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
//import { Layouts } from './layouts';
import { Templates } from './templates';

import {
	Link,
  } from "react-router-dom";
import { Console } from '../models/commonModels';
import { iPageProps } from '../models/pageModels';
import { Content } from './Content';
import { iContent } from '../models/contentModels';

export class Page extends React.Component<iPageProps, {}> {
		
	/*constructor(props: iPageProps) {
		super(props);
		this.state = {path: props.newPath};
	}/* */

	// дадим возможность переопределить в шаблонах
	renderSEO() {
		return <HelmetProvider key="seo">
			<Helmet title={this.props.pageWraper?.item?.seo.title} />
		</HelmetProvider>;
	}

	public renderLayout(layout: string) {
		//Console.log('-->', layout, (typeof Layouts[layout] !== 'undefined' ? Layouts[layout] : Layouts.Layout));
		//Console.log('-->', this.props.session);
		return React.createElement(typeof Templates[layout] !== 'undefined' ? Templates[layout] : Templates.Layout,
			{
				content: this.props.pageWraper?.item?.content && typeof this.props.pageWraper?.item?.content !== 'undefined' ? this.props.pageWraper?.item?.content : [],
				settings: null,
				pageWraper: this.props.pageWraper,
				session: this.props.session,
				key: 'layout'
			},
			null//<Html key={item.id} html={item.content} />
		);
	}


	render() {
		/*let mainhost = 'reactyii.test:3000'; // взять с process.env.REACT_APP_HOST
		let content = (
			<div>
				{this.renderSEO()}
				<h1>Привет, мир! {this.props.pageWraper?.key}</h1>
				{
					(this.props.loadingPath !== '' ? <div>loading... {this.props.loadingPath}</div> : '')
				}
				{
					this.props.pageWraper?.err ? <div>{this.props.pageWraper?.err}</div> : ''
				}
				<Link to="/">Home</Link><br />
				<Link to="/about.html">About</Link><br />
				<Link to="/contacts.html">Contacts</Link><br />
				<Link to="/news.html">News</Link><br />
				<br />
				<Link to={'//subdomain.' + mainhost + '/'}>Home subdomain</Link><br />
				<Link to={'//subdomain.' + mainhost + '/about.html'}>About subdomain</Link><br />
				<br />
				<Link to="/ru/part-of-path/">Home path section</Link><br />
				<Link to="/ru/part-of-path/articles.html">Articles</Link><br />
				<br />
				<Link to="/404.html">404</Link>
			</div>
		);

		let c: iContent[] = [];*/

		return [
			this.renderSEO(),
			this.renderLayout(this.props.pageWraper?.item?.layout ? this.props.pageWraper?.item?.layout : 'Layout')
		];
	}
}