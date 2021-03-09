import React from 'react';
//import ReactDOM from 'react-dom';
//import { hydrate, render } from "react-dom";
import { renderToString } from 'react-dom/server'
//import './index.css';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';

//import * as ReactDOMServer from 'react-dom/server';

//import {Page} from './views/Page';
import PageLoader from './features/page/PageLoader';

// https://reacttraining.com/react-router/web/guides/quick-start
//import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { StaticRouter as Router, Route, Switch } from 'react-router-dom';

import express from 'express';

const PORT = process.env.PORT || 3005;
const expr = express();

//console.log('-->', process.env.NODE_ENV);
//console.log('-->', process.env.REACT_APP_HOST);

// SSR
// https://www.digitalocean.com/community/tutorials/react-server-side-rendering-ru
// https://www.digitalocean.com/community/tutorials/react-react-router-ssr

// копипизда из index.tsx вынести в один файл (вынести не получится! Router (см импорт) другой)

expr.get('/*', (req, res) => {
	const context = {};
	const _app = renderToString(<React.StrictMode>
		<Provider store={store}>
			<Router location={req.url} context={context}>
				<Switch>
					<Route path="/app" component={App} />

					<Route path="/:path*" component={PageLoader} />
				</Switch>
			</Router>
		</Provider>
	</React.StrictMode>);
	const initialState = store.getState();

	//const indexFile = path.resolve('./build/index.html');
	//fs.readFile(indexFile, 'utf8', (err, data) => {
	//	if (err) {
	//		console.error('Something went wrong:', err);
	//		return res.status(500).send('Oops, better luck next time!');
	//	}

	//	return res.send(
	//		data.replace('<div id="root"></div>', `<div id="root">${app}</div>`)
	//	);
	//});
	res.send(`<div id="root">${_app}</div><script>window.__PRELOADED_STATE__ = ${JSON.stringify(initialState)}</script>`);
});/**/

//expr.use(express.static('./build'));

expr.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});