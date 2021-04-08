import { Hash } from '../../models/commonModels';
import { H1 } from './H1';
import { List } from './List';
import { Paginator } from './Paginator';
import { Layout } from './Layout';

export { H1, List, Paginator };
export { Layout/*, WideLayout*/ };

export const Templates: Hash<any> = {
    H1: H1,
    List: List,
    Paginator: Paginator,
    Layout: Layout,
    //WideLayout: WideLayout
};