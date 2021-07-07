import * as React from 'react';
import { iSession } from '../models/commonModels';
import { iContent } from '../models/contentModels';
import { iWrapLoadableItem } from '../models/baseRepository';
import { iPage } from '../models/pageModels';
interface iProps {
    html: string;
    data?: iContent[];
    pageWraper?: iWrapLoadableItem<iPage>;
    session?: iSession;
}
export declare class Html extends React.Component<iProps, {}> {
    render(): any;
}
export {};
