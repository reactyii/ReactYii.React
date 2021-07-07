import * as React from 'react';
import { Hash } from '../../models/commonModels';
import { RootState, AppDispatch } from '../../app/store';
import { iPageLoaderProps } from '../../models/pageModels';
declare const mapStateToProps: (state: RootState) => import("../../models/pageModels").iPageStoreState;
declare const mapDispatchToProps: (dispatch: AppDispatch) => {
    load: (path: string, get: Hash<string>) => import("../../app/store").AppThunk<void>;
    startLoadPage: import("@reduxjs/toolkit").ActionCreatorWithPayload<string, string>;
    test: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<string>;
};
declare type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & iPageLoaderProps;
declare type State = {};
declare class PageLoader extends React.Component<Props, State> {
    componentDidMount(): Promise<void>;
    componentDidUpdate(prevProps: iPageLoaderProps, prevState: State, snapshot: any): Promise<void>;
    protected loadPage(path: string): void;
    render(): JSX.Element;
}
declare const _default;
export default _default;
