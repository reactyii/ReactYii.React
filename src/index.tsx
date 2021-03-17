import React from 'react';
//import ReactDOM from 'react-dom';
import { hydrate, render } from "react-dom";
import './index.css';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';

//import {Page} from './views/Page';
import PageLoader from './features/page/PageLoader';

// https://reacttraining.com/react-router/web/guides/quick-start
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//console.log('-->', process.env.NODE_ENV);
//console.log('-->', process.env.REACT_APP_HOST);

// доки по SSR см тут https://github.com/stereobooster/react-snap

// Tell react-snap how to save Redux state
(window as any).snapSaveState = () => ({
	__PRELOADED_STATE__: store.getState()
});/**/

const rootElement = document.getElementById("root");
if (rootElement != null) {
	const app = <React.StrictMode>
		<Provider store={store}>
			<Router>
				<Switch>
					<Route path="/app" component={App} />

					<Route path="/:path*" component={PageLoader} />
				</Switch>
			</Router>
		</Provider>
	</React.StrictMode>;
	if (rootElement.hasChildNodes()) {
		hydrate(app, rootElement);
	} else {
		render(app, rootElement);
	}
}
/*ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<Router>
				<Switch>
					<Route path="/app" component={App}/>

					<Route path="/:path*" component={PageLoader}/>
				</Switch>
			</Router>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);/**/

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
