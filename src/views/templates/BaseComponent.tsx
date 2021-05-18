import * as React from 'react';
import { Utils } from '../../helpers/Utils';
import { Console } from '../../models/commonModels';
import { iContent, iContentProps } from '../../models/contentModels';
import { Content } from '../Content';

export class BaseComponent<Prop extends iContentProps, State> extends React.Component<Prop, State> {

	getContentByKey(key: string = 'CONTENT'): iContent[] {
		return key === 'CONTENT'
			? this.props.content.filter(item => typeof item.content_keys === 'undefined' || item.content_keys.length === 0 || item.content_keys?.indexOf(key) >= 0)
			: this.props.content.filter(item => item.content_keys?.indexOf(key) >= 0);
	}

	renderContentByKey(key: string): React.ReactNode {
		const content = this.getContentByKey(key);//this.props.content.filter(item => item.content_keys?.indexOf(key) >= 0);
		if (content.length === 0) return null;
		return <Content content={content} pageWraper={this.props.pageWraper} session={this.props.session} />;
	}

	renderError(message: string[]): React.ReactNode {
		Console.log('form error!');
		//return <Error content={[Utils.genContent('1', message)]} />;
		return <Content content={Utils.genErrorContent(message)} pageWraper={this.props.pageWraper} session={this.props.session} />;
	}


}