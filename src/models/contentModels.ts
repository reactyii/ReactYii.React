import {iTemplate} from './templateModels';
export interface iContent {
	template_keys: string[];
	template: iTemplate;
	childs: iContent[];
}