import * as React from 'react';
//import { connect } from 'react-redux';

// https://www.npmjs.com/package/html-react-parser
import Parser from 'html-react-parser';

import { Hash, iSession } from '../models/commonModels';
import { Content } from './Content';
import { iContent } from '../models/contentModels';
import { iWrapLoadableItem } from '../models/baseRepository';
import { iPage } from '../models/pageModels';

/*interface iProps {
    html: string;
    page: iPage | null;
    parent: Content | null;
    data?: Hash<iContent>;
    // вроде как они тут не нужны
    //attrs?: Hash<React.ReactText>;
    //cb?: tWidgetCallBack;
}*/
//interface iState { }
interface iProps {
    html: string;
    //data?: Hash<iContent>;
    data?: iContent[];
    pageWraper?: iWrapLoadableItem<iPage>;
    session?: iSession;
}

export class Html extends React.Component<iProps, {}>{//React.Component<iProps, {}> {
    public render() {

        let html = this.props.html;
        //Console.log('Html render', html);
        //let html = this.props.content.widget.template as string; // на null проверено снаружи
        //if (html.indexOf('<custom ') >= 0) throw new Error(Lang.get('CustomTemplateError') as string);

        const data: iContent[] = typeof this.props.data !== 'undefined' ? this.props.data : [];

        // ---------------------------------------------------------------------------------------------------------------------------
        // NB!!! использовать произвольный элемент типа <custom /> идея плохая так как если мы вставляем его в <table> то парсер вытащит его наружу таблицы!
        // и мы получим <custom /><table></table> вместо <table><custom /></table> (ну или если кастом это <tr> то <tr></tr><table></table> вместо <table><tr></tr></table>)
        // ---------------------------------------------------------------------------------------------------------------------------
        let htmls:Hash<iContent[]> = {};
        if (typeof data !== 'undefined') {
            //const keys = Object.keys(data);
            for (let i = 0, l = data.length; i < l; i++) {

                if (!data[i].content_keys || data[i].content_keys === null) continue;
                // 1 единица контента может быть использована несколько раз
                for (let j = 0, ll = data[i].content_keys.length; j < ll; j++) {
                    html = html.replace('{{' + data[i].content_keys[j] + '}}', '<custom name="' + data[i].content_keys[j] + '" />');
                    if (typeof htmls[data[i].content_keys[j]] === 'undefined') htmls[data[i].content_keys[j]] = [];
                    htmls[data[i].content_keys[j]].push(data[i]);
                }
            }
        }
        html = html.replace(/{{[^}]+}}/g, '');
        //Console.log('..', html, htmls);
        /**/
        return Parser(
            html, // this.props.html
            {
                replace: (domNode: any) => {

                    if (typeof this.props.data === 'undefined') return;
                    //Console.log('...', domNode.name);

                    if (domNode.name === 'custom') { // протестировано. domNode.name всегда в нижнем регистре
                        const content = htmls[domNode.attribs.name]; // всегда должно существовать! см выше мы делаем замены
                        //Console.log('...', domNode.name, domNode.attribs.name);
                        return <Content content={content} pageWraper={this.props.pageWraper} session={this.props.session} />;
                        //return <tbody><tr><td>{domNode.attribs.name}</td></tr></tbody>;
                        
                    }
                }
            }
        );
    }
}
