import * as React from 'react';
//import { connect } from 'react-redux';

// https://www.npmjs.com/package/html-react-parser
import Parser from 'html-react-parser';

import { Hash } from '../models/commonModels';
import { Content } from './Content';
import { iContent, iContentProps } from '../models/contentModels';

/*interface iProps {
    html: string;
    page: iPage | null;
    parent: Content | null;
    data?: Hash<iContent>;
    // вроде как они тут не нужны
    //attrs?: Hash<React.ReactText>;
    //cb?: tWidgetCallBack;
}*/
interface iState { }
interface iProps {
    html: string;
    data?: Hash<iContent>;
}

export class Html extends React.Component<iProps, {}>{//React.Component<iProps, {}> {
    public render() {
        /*
        //let html = this.props.html;
        let html = this.props.content.widget.template as string; // на null проверено снаружи
        if (html.indexOf('<custom ') >= 0) throw new Error(Lang.get('CustomTemplateError') as string);

        const data = this.props.widget.data;

        if (typeof data !== 'undefined') {
            const keys = Object.keys(data);
            for (let i = 0, l = keys.length; i < l; i++) {
                html = html.replace('{{' + keys[i] + '}}', '<custom name="' + keys[i] + '" />');
            }
        }
        html = html.replace(/{{[^}]+}}/g, '');
        */
        return Parser(
            this.props.html,//html,
            {
                replace: (domNode: any) => {

                    //if (typeof data === 'undefined') return;
                    //Console.log('...', domNode.name);

                    if (domNode.name == 'custom') { // протестировано. domNode.name всегда в нижнем регистре
                        //const content = data[domNode.attribs.name]; // всегда должно существовать! см выше мы делаем замены
                        //return <Content ref={ref => this.ref(content.id, ref)} content={content} page={this.props.page} parent={this.props.parent} />;
                        return '';
                    }
                }
            });
    }
}
