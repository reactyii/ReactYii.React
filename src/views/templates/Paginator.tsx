import * as React from 'react';
import { Link } from 'react-router-dom';
import { Console, Hash } from '../../models/commonModels';
//import { Console, ContentType } from '../../models/commonModels';
import { iContentProps } from '../../models/contentModels';


export class Paginator extends React.Component<iContentProps, {}> {

	render_first_link(url: string) {
		return <Link key="first" to={ url }>First</Link>;
	}
	render_last_link(url: string, ind: number) {
		return <Link key="last" to={url}>Last</Link>;
	}
	render_prev_link(url: string, ind: number) {
		return <Link key="prev" to={url}>Prev</Link>;
	}
	render_page(url: string, ind: number) {
		return <Link key={ind} to={url}>{ind}</Link>;
	}
	render_current(ind: number) {
		return <span key="current">{ ind }</span>;
	}
	render_next_link(url: string, ind: number) {
		return <Link key="next" to={url}>Next</Link>;
	}

	url(settings: Hash<string>, page: number): string {
		
		if (page == 0) {
			return typeof settings['first_url'] !== 'undefined' ? settings['first_url'] : settings['base_url'].replace('{{PAGE}}', '0')
		}

		return settings['base_url'].replace('{{PAGE}}', '' + page);
	}

	render() {
		Console.log('hhhhhhhhhhhh1', this.props.settings);
		if (typeof this.props.settings === 'undefined') return null;
		const s = this.props.settings;
		const per_page = +s['per_page']; // Max number of items you want shown per page
		const total_rows = +s['total_rows']; // Total number of items (database results)

		if (per_page === 0 || total_rows === 0) return null; // If our item count or per-page total is zero there is no need to continue.

		const cur_page = +s['cur_page']; // The current page being viewed
		const num_links = typeof s['num_links'] !== 'undefined' ? +s['num_links'] : 2; // Number of "digit" links to show before/after the currently viewed page

		const num_pages = Math.ceil(total_rows / per_page);

		if (num_pages === 1) return null; // Is there only one page? Hm... nothing more to do here then.
		Console.log('==num_pages=', num_pages);

		// Calculate the start and end numbers. These determine
		// which number to start and end the digit links with
		const start = ((cur_page + 1 - num_links) > 0) ? cur_page + 1 - (num_links) : 0;
		const end = (((cur_page + num_links) < num_pages) ? cur_page + num_links : num_pages);

		//const base_url = s['base_url'];  // The page we are linking to
		let res = [this.render_first_link(this.url(s, 0))];

		Console.log('hhhhhhhhhhhh1', cur_page, num_links);
		//let uri_page_number = cur_page;
		if (cur_page != 0) {
			res.push(this.render_prev_link(this.url(s, cur_page - 1), cur_page));
		}

		for (let loop = start; loop < end; loop++) {
			if (cur_page == loop) {
				res.push(this.render_current(loop + 1));
			} else {
				res.push(this.render_page(this.url(s, loop), loop + 1));
			}
		}

		if (cur_page < num_pages - 1) {
			res.push(this.render_next_link(this.url(s, cur_page + 1), cur_page + 2));
		}

		res.push(this.render_last_link(this.url(s, num_pages - 1), num_pages));
		
		return res;
	}
}