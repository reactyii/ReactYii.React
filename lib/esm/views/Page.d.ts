import * as React from 'react';
import { iPageProps } from '../models/pageModels';
export declare class Page extends React.Component<iPageProps, {}> {
    renderSEO(): JSX.Element;
    renderLayout(layout: string): React.CElement<{
        content: import("../models/contentModels").iContent[];
        settings: null;
        pageWraper: import("../models/baseRepository").iWrapLoadableItem<import("../models/pageModels").iPage> | undefined;
        session: import("../models/commonModels").iSession | undefined;
        key: string;
    }, React.Component<{
        content: import("../models/contentModels").iContent[];
        settings: null;
        pageWraper: import("../models/baseRepository").iWrapLoadableItem<import("../models/pageModels").iPage> | undefined;
        session: import("../models/commonModels").iSession | undefined;
        key: string;
    }, any, any>>;
    render(): JSX.Element[];
}
