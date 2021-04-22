import React from 'react';
//import ReactDOM from 'react-dom';
//import { hydrate, render } from "react-dom";
//import './index.css';

import { store } from './app/store';
import { Provider } from 'react-redux';

//import {Page} from './views/Page';
import PageLoader from './features/page/PageLoader';

// https://reacttraining.com/react-router/web/guides/quick-start
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//import { Console } from './models/commonModels';
//import { Utils } from './helpers/Utils';

// доки по SSR см тут https://github.com/stereobooster/react-snap

// Tell react-snap how to save Redux state
(window as any).snapSaveState = () => ({
	__PRELOADED_STATE__: store.getState()
});/**/


export const App = <React.StrictMode>
	<Provider store={store}>
		<Router>
			<Switch>

				<Route path="/:path*" component={PageLoader} />
			</Switch>
		</Router>
	</Provider>
</React.StrictMode>;