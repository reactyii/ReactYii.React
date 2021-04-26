import * as React from 'react';
import { Router } from './Router';
import { withRouter } from "react-router-dom";

const withRouterAndRef = (Wrapped: any) => {
    const WithRouter = withRouter(({ forwardRef, ...otherProps }: any) => {
        return <Wrapped ref={forwardRef} {...otherProps} />;
    })
    const WithRouterAndRef = React.forwardRef((props, ref) => (
        <WithRouter {...props} forwardRef={ref} />
    ))
    const name = Wrapped.displayName || Wrapped.name
    WithRouterAndRef.displayName = `withRouterAndRef(${name})`
    return WithRouterAndRef
}/**/

/*const withRouterForwardRef = (Component: any) => {
    const WithRouter = withRouter(({ forwardedRef, ...props }) => {
        return <Component ref={forwardedRef} {...props} />;
    });

    return React.forwardRef((props, ref) => {
        return <WithRouter {...props} forwardedRef={ref} />;
    });
};/**/

/*const ChildWithRoute = React.forwardRef((props: any, ref): any => {
    React.useImperativeHandle(ref, () => ({
        say: () => {
            console.log("hello")
        },
    }));

    //return <History {...props} />;
    return '!!';
})/**/

export default withRouterAndRef(Router)
//export default withRouter(History);
//export default withRouter(ChildWithRoute);