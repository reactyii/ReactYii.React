import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';

//import {Page} from './views/Page';
import PageLoader from './features/page/PageLoader';

// https://reacttraining.com/react-router/web/guides/quick-start
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

ReactDOM.render(
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
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
