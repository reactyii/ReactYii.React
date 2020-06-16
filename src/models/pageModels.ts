import * as H from 'history';
import { match } from "react-router";

import { iContent } from './contentModels';
import { iLoadableItem, iWrapLoadableItem  } from './baseRepository';

export interface iPageProps {
	page?: iWrapLoadableItem<iPage>;
}

export interface iPageLoaderProps {
	readonly match: match<{}>;//<Hash<string>>;
	readonly location: H.Location;
	readonly history: H.History;
}

export interface iPageStoreState {
	//readonly currentPath: string; // путь который загружен в данный момент
	readonly loadingPath: string; // путь который грузится в жанный момент, если '' то загрузки нет
	readonly page?: iWrapLoadableItem<iPage>;

	// вынести в общего предка для загружаемых объектов
	/*readonly error?: string; // ошибка при загрузке страницы
	readonly timeLoaded?: Date; // время загрузки страницы, чтобы сделать еще попытку загрузки при сетевой ошибке
	//readonly loadRetryTime?: Date; // время когда нужно повторить загрузку страницы
	readonly timer?: number; // вместо loadRetryTime скорее всего сразу будем формировать отложенный таск на повтор
	/**/
}

export interface iPage extends iLoadableItem {
	readonly path: string; // путь по которому загружена страница
	lang?: string;
	section?: string;
	template: string;
	layout: string;
	contents: iContent[];
}
