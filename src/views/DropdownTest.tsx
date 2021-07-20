import * as React from 'react';
import { Dropdown, iDropdownState, iDropdownProps } from './Dropdown';


export class DropdownTest extends Dropdown<iDropdownProps, iDropdownState> {
    getStateFromProps(props: iDropdownProps): iDropdownState {
		return { isopen: props.isopen || false };
    }

	render(): React.ReactNode {
		return <div className="" style={{ display: 'block', float: 'left' }}>
			<a href="#" onClick={this.toggle}>{this.props.title}</a>
			<div style={{ display: this.state.isopen ? 'block' : 'none', position: 'absolute' }}>{this.props.body}</div>
		</div>;
	}
}