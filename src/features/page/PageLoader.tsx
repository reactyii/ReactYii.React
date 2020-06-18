import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
	//Hash, 
	//ContentType,
} from '../../models/commonModels';
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
		load: (path:string) => async (dispatch: AppDispatch): Promise<void> => {
			dispatch(loadPageAsync(path))
		},
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
	//var location = useLocation();
	
	async componentDidMount() {
		//console.log(this.props.match, this.props.location, this.props.history);
		this.loadPage(this.props.match.url);
	}
	async componentDidUpdate(prevProps: iPageLoaderProps, prevState:State, snapshot:any) {
		//var location = useLocation();
		//console.log(location);
		this.loadPage(this.props.match.url);
	}/* */

	protected loadPage(path: string) {
		//if (path === this.props.pageWraper?.key) return;
		if (path === this.props.pageWraper?.key || path === this.props.loadingPath) return;
		
		console.log('try load page', path);
		
		this.props.load(path);
	}

	render() {
		//var { path } = useParams();
		//var path = '';
		//var location = useLocation();
		return <Page page={this.props.pageWraper} />;
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps//dispatchProps
  )(PageLoader);
  