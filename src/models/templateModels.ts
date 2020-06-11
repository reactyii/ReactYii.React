import {
	//Hash, 
	ContentType,
} from './commonModels';

export interface iTemplate {
	type: ContentType;
	filename?: string;
	template?: string;
}