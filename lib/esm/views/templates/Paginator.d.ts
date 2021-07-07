import * as React from 'react';
import { Hash } from '../../models/commonModels';
import { iContentProps } from '../../models/contentModels';
export declare class Paginator extends React.Component<iContentProps, {}> {
    renderFirstLink(url: string): JSX.Element;
    renderLastLink(url: string, ind: number): JSX.Element;
    renderPrevLink(url: string, ind: number): JSX.Element;
    renderPage(url: string, ind: number): JSX.Element;
    renderCurrent(ind: number): JSX.Element;
    renderNextLink(url: string, ind: number): JSX.Element;
    url(settings: Hash<string>, page: number): string;
    renderPages(pages: Hash<React.ReactNode>): React.ReactNode;
    preparePages(): Hash<React.ReactNode>;
    render(): React.ReactNode;
}
