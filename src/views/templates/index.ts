import { Hash } from '../../models/commonModels';
import { H1 } from './H1';
import { List } from './List';
import { ListContent } from './ListContent';
import { Paginator } from './Paginator';
import { Layout } from './Layout';
import { Form } from './Form';
import { FormFilterContent } from './FormFilterContent';
import { FormFilter } from './FormFilter';
import { Field } from './Field';
import { FieldSelect} from './FieldSelect';

export { H1, List, ListContent, Paginator };
export { Layout/*, WideLayout*/ };

export const Templates: Hash<any> = {
    H1: H1,
    List: List,
    ListContent: ListContent,
    Form: Form,
    FormFilter: FormFilter,
    FormFilterContent: FormFilterContent,
    Field: Field,
    FieldSelect: FieldSelect,
    Paginator: Paginator,
    Layout: Layout,
    //WideLayout: WideLayout
};