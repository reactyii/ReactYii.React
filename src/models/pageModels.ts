import * as H from 'history';
import { match } from "react-router";

import { iContent } from './contentModels';
import { iLoadableItem, iWrapLoadableItem  } from './baseRepository';
import { Hash, iLanguage, iSection, iSeo, iSession } from './commonModels';

export interface iPageProps {
	pageWraper?: iWrapLoadableItem<iPage>;
	session?: iSession;
	loadingPath: string;
}

export interface iPageLoaderProps {
	readonly match: match<{}>;//<Hash<string>>;
	readonly location: H.Location;
	readonly history: H.History;
}

export interface iPageStoreState {
	//readonly currentPath: string; // путь который загружен в данный момент
	readonly loadingPath: string; // путь который грузится в жанный момент, если '' то загрузки нет
	readonly pageWraper?: iWrapLoadableItem<iPage>;
	readonly session?: iSession;
	//readonly forms: Hash<Hash<string | string[]>>;

	// вынести в общего предка для загружаемых объектов
	/*readonly error?: string; // ошибка при загрузке страницы
	readonly timeLoaded?: Date; // время загрузки страницы, чтобы сделать еще попытку загрузки при сетевой ошибке
	//readonly loadRetryTime?: Date; // время когда нужно повторить загрузку страницы
	readonly timer?: number; // вместо loadRetryTime скорее всего сразу будем формировать отложенный таск на повтор
	/**/
}

export interface iPage extends iLoadableItem {
	readonly path: string; // путь по которому загружена страница
	lang: iLanguage | null;
	section: iSection | null;
	section_id: number | null;
	//template: string;
	layout: string | null;
	content: iContent[];
	is_current_section: boolean;
	seo: iSeo;
	session?: iSession; // данные о сайте грузим вместе со страницей, если в сессии что то изменилось с последнего обновления, то придет новая сессия, если нового нет значит юзаем старую
	forms: Hash<Hash<string | string[]>>;
}
