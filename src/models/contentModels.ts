import {iTemplate} from './templateModels';
export interface iContent {
    id: string;
    name: string;
    priority: number;
    parent_id: number | null;
    path: string;
    content: string;
    type: string;
    childs: iContent[] | undefined;
	template_keys: string[];
	template: iTemplate;
}

export interface iContentProps {
    content: iContent[];
}