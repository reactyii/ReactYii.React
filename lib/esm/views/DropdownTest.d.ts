import * as React from 'react';
import { Dropdown, iDropdownState, iDropdownProps } from './Dropdown';
export declare class DropdownTest extends Dropdown<iDropdownProps, iDropdownState> {
    getStateFromProps(props: iDropdownProps): iDropdownState;
    render(): React.ReactNode;
}
