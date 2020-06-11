import * as H from 'history';
import { match } from "react-router";

import { iContent } from './contentModels';
//import { Hash } from './commonModels';

export interface iPageProps {
	page?: iPage;
	path?: string;
}

export interface iPageLoaderProps {
	readonly match: match<{}>;//<Hash<string>>;
	readonly location: H.Location;
	readonly history: H.History;
}

export interface iPageState {
	readonly currentPath: string;
	readonly value?: iPage;
}

export interface iPage {
	lang?: string;
	section?: string;
	template: string;
	layout: string;
	contents: iContent[];
}
