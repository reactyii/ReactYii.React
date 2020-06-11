import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
	//Hash, 
	//ContentType,
} from '../../models/commonModels';
import {RootState, AppDispatch} from '../../app/store';
import {iPageLoaderProps, iPage} from '../../models/pageModels';
import {Page} from '../../views/Page';
import {setPage, loadAsync, testPage} from '../../features/page/pageSlice';

const mapStateToProps = (state: RootState) => (state.page);
/*const mapDispatchToProps = {
	setPage: setPage
}*/

// Thunk Action
const loadWithDelay = (path:string) => async (dispatch: AppDispatch): Promise<void> => {
	//setTimeout(() => dispatch(loadAsync(path)), 1000);
	dispatch(loadAsync(path))
};
const mapDispatchToProps = (dispatch:AppDispatch) =>  bindActionCreators(
    {
		load: loadWithDelay,//(path:string) => dispatch(loadAsync(path)),
		setPage: setPage,
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
		if (path === this.props.currentPath) return;
		
		console.log(path);
		var page:iPage = {template:'', layout:'', contents:[]};
		//this.props.setPage(page);
		
		//this.props.load(path);
		this.props.test();
	}

	render() {
		//var { path } = useParams();
		//var path = '';
		//var location = useLocation();
		return <Page page={this.props.value} path={this.props.currentPath} />;
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps//dispatchProps
  )(PageLoader);
  