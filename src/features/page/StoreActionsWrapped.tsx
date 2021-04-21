import { connect } from 'react-redux';

import { mapDispatchToProps, mapStateToProps, StoreActions } from './StoreActions';

export default connect(
	mapStateToProps,
	mapDispatchToProps,//dispatchProps
	null,
	{
		forwardRef: true,
	}
)(StoreActions);