import * as React from 'react';
import { iContentProps } from '../../models/contentModels';
import { Hash } from '../../models/commonModels';
export declare class A extends React.Component<iContentProps, {}> {
    renderA(url: string, content: React.ReactNode, attrs?: React.AnchorHTMLAttributes<HTMLAnchorElement>): React.ReactNode;
    getAttrs(settings: Hash<string>): React.AnchorHTMLAttributes<HTMLAnchorElement>;
    getUrl(settings: Hash<string>): string;
    renderContent(settings: Hash<string>): React.ReactNode;
    render(): React.ReactNode;
}
