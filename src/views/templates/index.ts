import { Hash } from '../../models/commonModels';
import { H1 } from './H1';
import { List } from './List';
import { Paginator } from './Paginator';

export { H1, List, Paginator };

export const Templates: Hash<any> = {
    H1: H1,
    List: List,
    Paginator: Paginator,
    //WideLayout: WideLayout
};