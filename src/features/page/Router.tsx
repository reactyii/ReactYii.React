import * as React from 'react';
import { withRouter } from "react-router";
import { RouteComponentProps } from "react-router";

// Your component own properties
type PropsType = RouteComponentProps<any>

// A simple component that shows the pathname of the current location
export class Router extends React.Component<PropsType, {}> {

    public historyPush(url: string) {
        this.props.history.push(url);
    }

    render() {
        return [];
    }
}