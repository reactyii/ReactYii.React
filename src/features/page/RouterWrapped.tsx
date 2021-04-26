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
}

export default withRouterAndRef(Router)
