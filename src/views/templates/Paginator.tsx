import * as React from 'react';
import { Link } from 'react-router-dom';
import { Hash } from '../../models/commonModels';
//import { Console, ContentType } from '../../models/commonModels';
import { iContentProps } from '../../models/contentModels';


export class Paginator extends React.Component<iContentProps, {}> {

	renderFirstLink(url: string) {
		return <Link key="first" to={ url }>First</Link>;
	}
	renderLastLink(url: string, ind: number) {
		return <Link key="last" to={url}>Last</Link>;
	}
	renderPrevLink(url: string, ind: number) {
		return <Link key="prev" to={url}>Prev</Link>;
	}
	renderPage(url: string, ind: number) {
		return <Link key={ind} to={url}>{ind}</Link>;
	}
	renderCurrent(ind: number) {
		return <span key="current">{ ind }</span>;
	}
	renderNextLink(url: string, ind: number) {
		return <Link key="next" to={url}>Next</Link>;
	}

	url(settings: Hash<string>, page: number): string {
		
		if (page === 0) {
			return typeof settings['first_url'] !== 'undefined' ? settings['first_url'] : settings['base_url'].replace('{{PAGE}}', '0')
		}

		return settings['base_url'].replace('{{PAGE}}', '' + page);
	}

	renderPages(pages: Hash<React.ReactNode>): React.ReactNode {

		// для тестового примера мы просто рендерим всем линки как есть, но в переопределенных вариантах может понадодобится что-то вставить между ними
		return <div>{Object.values(pages)}</div>;
	}

	preparePages(): Hash<React.ReactNode> {
		//Console.log('pages settings:', this.props.settings);
		if (typeof this.props.settings === 'undefined') return {};
		const s = this.props.settings;
		const per_page = +s['per_page']; // Max number of items you want shown per page
		const total_rows = +s['total_rows']; // Total number of items (database results)

		if (per_page === 0 || total_rows === 0) return {}; // If our item count or per-page total is zero there is no need to continue.

		const cur_page = +s['cur_page']; // The current page being viewed
		const num_links = typeof s['num_links'] !== 'undefined' ? +s['num_links'] : 2; // Number of "digit" links to show before/after the currently viewed page

		const num_pages = Math.ceil(total_rows / per_page);

		if (num_pages === 1) return {}; // Is there only one page? Hm... nothing more to do here then.
		//Console.log('==num_pages=', num_pages);

		// Calculate the start and end numbers. These determine
		// which number to start and end the digit links with
		const start = ((cur_page + 1 - num_links) > 0) ? cur_page + 1 - (num_links) : 0;
		const end = (((cur_page + num_links) < num_pages) ? cur_page + num_links : num_pages);

		//const base_url = s['base_url'];  // The page we are linking to

		let res: Hash<React.ReactNode> = { 'first': this.renderFirstLink(this.url(s, 0)) };

		//Console.log('hhhhhhhhhhhh1', cur_page, num_links);
		if (cur_page !== 0) {
			res['prev'] = this.renderPrevLink(this.url(s, cur_page - 1), cur_page);
		}

		let pages = [];
		for (let loop = start; loop < end; loop++) {
			if (cur_page === loop) {
				pages.push(this.renderCurrent(loop + 1));
			} else {
				pages.push(this.renderPage(this.url(s, loop), loop + 1));
			}
		}
		res['pages'] = pages;

		if (cur_page < num_pages - 1) {
			res['next'] = this.renderNextLink(this.url(s, cur_page + 1), cur_page + 2);
		}

		res['last'] = this.renderLastLink(this.url(s, num_pages - 1), num_pages);
		
		return res;
	}

	render() {
		return this.renderPages(this.preparePages());
	}
}