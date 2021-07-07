import * as React from 'react';
import { iContent, iContentProps } from '../../models/contentModels';
import { Field } from './Field';
export declare class FieldSelect extends Field {
    constructor(props: iContentProps);
    handleChange(event: React.ChangeEvent<HTMLSelectElement>): void;
    renderOptions(options: iContent[], selected?: string[], singlePrefix?: string, prefix?: string): React.ReactNode[];
    renderField(): React.ReactNode;
}
