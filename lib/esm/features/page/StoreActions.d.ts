import * as React from 'react';
import { Hash } from '../../models/commonModels';
import { RootState, AppDispatch } from '../../app/store';
export declare const mapStateToProps: (state: RootState) => import("../../models/pageModels").iPageStoreState;
export declare const mapDispatchToProps: (dispatch: AppDispatch) => {
    clearForm: import("@reduxjs/toolkit").ActionCreatorWithPayload<import("../../features/page/pageSlice").iFormClearPayload, string>;
    setFieldValue: import("@reduxjs/toolkit").ActionCreatorWithPayload<import("../../features/page/pageSlice").iSetValuePayload, string>;
    load: (path: string, get: Hash<string>) => import("../../app/store").AppThunk<void>;
    post: (path: string, get: Hash<string>, post: Hash<string | string[]>) => import("../../app/store").AppThunk<void>;
    startLoadPage: import("@reduxjs/toolkit").ActionCreatorWithPayload<string, string>;
    test: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<string>;
};
export declare type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;
declare type State = {};
export declare class StoreActions extends React.Component<Props, State> {
    shouldComponentUpdate(nextProps: Props, nextState: State): boolean;
    clearForm(formkey: string, fullClear?: boolean): void;
    setFieldValue(formkey: string, fieldName: string, value: string | string[]): void;
    submitForm(url: string, get: Hash<string>, post: Hash<string | string[]>): void;
    loadPage(path: string): void;
    render(): null;
}
export {};
