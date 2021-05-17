import { Hash } from '../../models/commonModels';
import { H1 } from './H1';
import { A } from './A';
import { List } from './List';
import { ListContent } from './ListContent';
import { Paginator } from './Paginator';
import { Layout } from './Layout';
import { Form } from './Form';
//import { FormFilterContent } from './FormFilterContent';
import { FormFilter } from './FormFilter';
import { FormSubmit } from './FormSubmit';
import { FormReset } from './FormReset';
import { Field } from './Field';
import { FieldSelect } from './FieldSelect';
import { FieldHidden } from './FieldHidden';
import { Error } from './Error';
import { Message } from './Message';

export { H1, List, ListContent, Paginator, Form, FormFilter, Field, FieldSelect, FieldHidden, FormSubmit, FormReset, A};
export { Layout/*, WideLayout*/ };
export { Error, Message };

export const Templates: Hash<any> = {
    H1: H1,
    A:A,
    List: List,
    ListContent: ListContent,
    Form: Form,
    FormFilter: FormFilter,
    //FormFilterContent: FormFilterContent,
    Field: Field,
    FieldSelect: FieldSelect,
    FieldHidden: FieldHidden,
    FormSubmit: FormSubmit,
    FormReset: FormReset,
    Paginator: Paginator,
    Layout: Layout,
    Error: Error,
    Message: Message,
    //WideLayout: WideLayout
};