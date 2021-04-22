import * as React from 'react';
import { Hash } from '../../models/commonModels';
import { H1 } from './H1';
import { List } from './List';
import { ListContent } from './ListContent';
import { Paginator } from './Paginator';
import { Layout } from './Layout';
import { Form } from './Form';
//import { FormFilterContent } from './FormFilterContent';
import { FormFilter } from './FormFilter';
import { FormSubmit } from './FormSubmit';
import { Field } from './Field';
import { FieldSelect } from './FieldSelect';
import { Error } from './Error';

export { H1, List, ListContent, Paginator, Form, FormFilter, Field, FieldSelect, FormSubmit, };
export { Layout/*, WideLayout*/ };
export { Error };

export const Templates: Hash<any> = {
    H1: H1,
    List: List,
    ListContent: ListContent,
    Form: Form,
    FormFilter: FormFilter,
    //FormFilterContent: FormFilterContent,
    Field: Field,
    FieldSelect: FieldSelect,
    FormSubmit: FormSubmit,
    Paginator: Paginator,
    Layout: Layout,
    Error: Error,
    //WideLayout: WideLayout
};