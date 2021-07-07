import { iContentProps } from '../../models/contentModels';
import { iFieldState } from '../../models/commonModels';
import { Field } from './Field';
export declare class FieldHidden extends Field {
    shouldComponentUpdate(props: iContentProps, state: iFieldState): boolean;
    renderField(): never[];
}
