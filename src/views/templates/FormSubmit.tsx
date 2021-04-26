import * as React from 'react';
//import { Console, ContentType } from '../../models/commonModels';
import { iContentProps } from '../../models/contentModels';
import { Content } from '../Content';
import { Utils } from '../../helpers/Utils';
//import { FormStorage } from '../../helpers/FormStorage';
import { Hash, iSite } from '../../models/commonModels';
import { iPage } from '../../models/pageModels';
//import { Html } from '../Html';

export class FormSubmit extends React.Component<iContentProps, {}> {


	render() {
		return <button name={this.props.settings?.ignore ? '' : this.props.settings?.fieldname } type="submit">{this.props.settings?.value || 'Submit'}</button>;
	}
}