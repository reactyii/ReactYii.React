import * as React from 'react';
import { Link } from 'react-router-dom';
import { iContentProps } from '../../models/contentModels';

//import { NavMenu } from '@template/views/NavMenu';
//import { Header, Footer } from '@template/views';
//import { iPageProps } from '../../models/pageModels';
import { Content } from '../Content';
import { DropdownTest } from '../DropdownTest';

export class Layout extends React.Component<iContentProps, {}> {

    public render() {
        //Console.log('...Layout::render()');

        const content = <Content content={this.props.content.filter(item => {
            return typeof item.content_keys === 'undefined' || item.content_keys.indexOf('CONTENT') >= 0;
        })} pageWraper={this.props.pageWraper} session={this.props.session} />

        return <div className="page"><b>Layout</b> <Link to="/admin/contents.html" >list</Link>
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
