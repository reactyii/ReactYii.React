import * as React from 'react';

//import { NavMenu } from '@template/views/NavMenu';
//import { Header, Footer } from '@template/views';
import { iPageProps } from '../../models/pageModels';

export class Layout extends React.Component<iPageProps, {}> {

    public render() {
        //Console.log('...Layout::render()');
        return <div className="page"><b>Layout</b> {this.props.pageWraper?.key}
            <div className="page-main">
                

                <div className="my-3 my-md-5">
                    <div className="container">
                        {this.props.children}
                    </div>
                </div>
            </div>
            

        </div>;
    }
}
