import { hydrate, render } from "react-dom";
import './index.css';
import * as serviceWorker from './serviceWorker';


// https://reacttraining.com/react-router/web/guides/quick-start
//import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Console } from './models/commonModels';
import { Utils } from './helpers/Utils';
import { Templates } from './views/templates';
import { App } from './App';

Console.log('-->', process.env.NODE_ENV);
//Console.log('-->', process.env.REACT_APP_HOST);

// пока решим проблему вот так топорно.
Utils.Templates = Templates;

const rootElement = document.getElementById("root");
if (rootElement != null) {
	if (rootElement.hasChildNodes()) {
		hydrate(App, rootElement);
	} else {
		render(App, rootElement);
	}
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
