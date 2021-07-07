import { PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';
import { iPageStoreState, iPage } from '../../models/pageModels';
import { iWrapLoadableItem } from '../../models/baseRepository';
import { Hash } from '../../models/commonModels';
export interface iFormClearPayload {
    formkey: string;
    fullClear?: boolean;
}
export interface iSetValuePayload {
    formkey: string;
    fieldName: string;
    value: string | string[];
}
export declare const pageSlice: import("@reduxjs/toolkit").Slice<iPageStoreState, {
    testPage: (state: import("immer/dist/internal").WritableDraft<iPageStoreState>) => void;
    clearForm(state: import("immer/dist/internal").WritableDraft<iPageStoreState>, action: PayloadAction<iFormClearPayload>): void;
    setFieldValue(state: import("immer/dist/internal").WritableDraft<iPageStoreState>, action: PayloadAction<iSetValuePayload>): void;
    startFormSubmit: (state: import("immer/dist/internal").WritableDraft<iPageStoreState>, action: PayloadAction<string>) => void;
    startLoadPage: (state: import("immer/dist/internal").WritableDraft<iPageStoreState>, action: PayloadAction<string>) => void;
    endLoadPage: (state: import("immer/dist/internal").WritableDraft<iPageStoreState>, action: PayloadAction<iWrapLoadableItem<iPage>>) => void;
}, "page">;
export declare const testPage: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<string>, startLoadPage: import("@reduxjs/toolkit").ActionCreatorWithPayload<string, string>, endLoadPage: import("@reduxjs/toolkit").ActionCreatorWithPayload<iWrapLoadableItem<iPage>, string>, clearForm: import("@reduxjs/toolkit").ActionCreatorWithPayload<iFormClearPayload, string>, setFieldValue: import("@reduxjs/toolkit").ActionCreatorWithPayload<iSetValuePayload, string>, startFormSubmit: import("@reduxjs/toolkit").ActionCreatorWithPayload<string, string>;
export declare const loadPageAsync: (path: string, get: Hash<string>) => AppThunk;
export declare const postFormAsync: (path: string, get: Hash<string>, post: Hash<string | string[]>) => AppThunk;
export declare const selectPage: (state: RootState) => iWrapLoadableItem<iPage> | undefined;
declare const _default: import("redux").Reducer<iPageStoreState, import("redux").AnyAction>;
export default _default;
