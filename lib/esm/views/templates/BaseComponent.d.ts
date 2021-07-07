import * as React from 'react';
import { iContent, iContentProps } from '../../models/contentModels';
export declare class BaseComponent<Prop extends iContentProps, State> extends React.Component<Prop, State> {
    getSetting(name: string, defValue?: string | undefined): string | undefined;
    getContentByKey(key?: string): iContent[];
    renderContentByKey(key: string): React.ReactNode;
    renderError(message: string[]): React.ReactNode;
}
