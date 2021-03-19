import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Console, Hash } from '../../models/commonModels';
import {RootState, AppDispatch} from '../../app/store';
import {iPageLoaderProps} from '../../models/pageModels';
import {Page} from '../../views/Page';
import {startLoadPage, loadPageAsync, testPage} from '../../features/page/pageSlice';

const mapStateToProps = (state: RootState) => (state.page);
/*const mapDispatchToProps = {
	setPage: setPage
}*/

// Thunk Action
const mapDispatchToProps = (dispatch:AppDispatch) =>  bindActionCreators(
    {
		load: (path: string, params: Hash<string>) => async (dispatch: AppDispatch): Promise<void> => {
			dispatch(loadPageAsync(path, params))
		},/**/
		//load: loadPageAsync,
		startLoadPage: startLoadPage,
		test: testPage
    },
    dispatch
);/* */

type Props = ReturnType<typeof mapStateToProps> 
	//& typeof mapDispatchToProps	
	& ReturnType<typeof mapDispatchToProps> 
	& iPageLoaderProps;

type State = {};

class PageLoader extends React.Component<Props, State> {
		
	/*constructor(props: iPageProps) {
		super(props);
		this.state = {path: props.newPath};
	}/* */
	//let location = useLocation();
	
	async componentDidMount() {
		//Console.log(this.props.match, this.props.location, this.props.history);
		this.loadPage(this.props.match.url);
	}
	async componentDidUpdate(prevProps: iPageLoaderProps, prevState:State, snapshot:any) {
		this.loadPage(this.props.match.url);
	}/* */

	protected loadPage(path: string) {
		// добавим дату последнего изменения данных сайта
		Console.log('session', this.props.session);
		let params: Hash<string> = {};
		if (typeof this.props.session !== 'undefined' && typeof this.props.session.site !== 'undefined') {
			
			params['__siteLM'] = '' + this.props.session.site.lastModified;
		}
		//Console.log('check for load page path=', path, 'key=', this.props.pageWraper?.key, 'loading=', this.props.loadingPath);

		// 1 отсекаем если мы уже грузим эту страницу
		if (/*path === this.props.pageWraper?.key ||*/ path === this.props.loadingPath) return;

		// 2 отсекаем если эта страница загружена в данный момент и мы не в состояни загрузки
		if (this.props.loadingPath === '' && path === this.props.pageWraper?.key) return;
		
		Console.log('------try load page', path, params);
		
		this.props.load(path, params);
	}

	render() {
		//let { path } = useParams();
		//let path = '';
		//let location = useLocation();
		return <Page pageWraper={this.props.pageWraper} loadingPath={this.props.loadingPath} />;
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps//dispatchProps
  )(PageLoader);
  