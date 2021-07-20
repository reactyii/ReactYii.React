import * as React from 'react';
export interface iDropdownProps {
    test?: boolean;
    isopen?: boolean;
    title: React.ReactNode;
    body: React.ReactNode;
}
export interface iDropdownState {
    isopen: boolean;
}
export declare abstract class Dropdown<PROP extends iDropdownProps, STATE extends iDropdownState> extends React.Component<PROP, STATE> {
    abstract getStateFromProps(props: PROP): STATE;
    constructor(props: PROP);
    componentDidMount(): Promise<void>;
    componentWillUnmount(): Promise<void>;
    private subscribeOpenDropdownCallback;
    protected subscribeEvents(props: PROP): void;
    toggle(event: React.MouseEvent): boolean;
    close(): void;
    open(): void;
    abstract render(): React.ReactNode;
}
