import * as React from 'react';
import { RouteComponentProps } from "react-router";
declare type PropsType = RouteComponentProps<any>;
declare type StateType = {};
export declare class Router extends React.Component<PropsType, StateType> {
    shouldComponentUpdate(nextProps: PropsType, nextState: StateType): boolean;
    historyPush(url: string): void;
    render(): null;
}
export {};
