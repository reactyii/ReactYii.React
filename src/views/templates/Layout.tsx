import * as React from 'react';
import { Link } from 'react-router-dom';
import { Console } from '../../models/commonModels';
import { iContentProps } from '../../models/contentModels';

//import { NavMenu } from '@template/views/NavMenu';
//import { Header, Footer } from '@template/views';
//import { iPageProps } from '../../models/pageModels';
import { Content } from '../Content';
import { DropdownTest } from '../DropdownTest';

export class Layout extends React.Component<iContentProps, {}> {

    renderMenu(content_key: string) {
        const content = this.props.content.filter(item => {
            return /*typeof item.content_keys !== 'undefined' &&*/ item.content_keys?.indexOf(content_key) >= 0;
        });

        Console.log(content);

        return <Content content={content} pageWraper={this.props.pageWraper} session={this.props.session} />
    }

    public render() {
        //Console.log('...Layout::render()');

        const content = <Content content={this.props.content.filter(item => {
            return typeof item.content_keys === 'undefined' || item.content_keys.indexOf('CONTENT') >= 0;
        })} pageWraper={this.props.pageWraper} session={this.props.session} />

        const rurl = '/p' + Date.now() + '.html';
        return <div className="page">
            <div>{this.renderMenu('TOP_MENU')}</div>
            <b>Layout</b> <Link to="/admin/contents.html" >list</Link> <Link to="/404.html" >404</Link>
            {
                navigator.userAgent !== "ReactSnap"
                ? <Link to={rurl} >random 404</Link>
                    : null
                /* нельзя так делать!!! мы ж будем показывать, то что нагенерим для "ReactSnap" обычным юзерам
                  <Link to="/500.html" >500</Link>
                */
            }
            <div className="page-main">


                <div className="my-3 my-md-5">
                    <div className="container">
                        {content}
                    </div>
                </div>
            </div>

            Test zone
            <div>
                <DropdownTest isopen={true} title="dropdown1" body={<div>тело дропдауна 1</div>}></DropdownTest>

                <DropdownTest title="dropdown2" body={<div>тело дропдауна 2</div>}></DropdownTest>
                <DropdownTest title="dropdown3" body={<div>тело дропдауна 3</div>}></DropdownTest>

            </div>
        </div>;
    }
}
