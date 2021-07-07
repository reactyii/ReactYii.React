import * as React from 'react';
import { iContent, iContentProps } from '../models/contentModels';
export declare class Content extends React.Component<iContentProps, {}> {
    protected _prepareChilds(item: iContent): iContent[];
    render(): (string | JSX.Element | null)[];
}
