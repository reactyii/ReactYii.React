import * as React from 'react';
//import { Console } from '../models/commonModels';
//import { iContentProps } from '../models/contentModels';
import { CB } from 'eexchange';
import  eexchange from 'eexchange';
//import { Content } from './Content';
//import { Html } from '../Html';

export interface iDropdownProps {
	test?: boolean;
	isopen?: boolean;
	//uid: string;
	title: React.ReactNode;
	body: React.ReactNode;
}

export interface iDropdownState {
	isopen: boolean;
}


export abstract class Dropdown<PROP extends iDropdownProps, STATE extends iDropdownState> extends React.Component<PROP, STATE> {
	//private uid: string;

	abstract getStateFromProps(props: PROP): STATE;

	constructor(props: PROP) {
		super(props);
		//Console.log('!!!!');

		this.state = this.getStateFromProps(props);

		//this.uid = props.uid;

		this.close = this.close.bind(this);
		this.open = this.open.bind(this);
		this.toggle = this.toggle.bind(this);

		this.subscribeOpenDropdownCallback = this.subscribeOpenDropdownCallback.bind(this);
	}

	async componentDidMount() {
		// �������� �� ������� ������ ������ ���, ��� ��� ����� ����� ��������� �������, � �� �� �������������� � ������� ��������� ������ ����� ���
		this.subscribeEvents(this.props);

		// ��� ������� ������ �������� ���� �� ������
		//this.subscribeEvents(this.props);
	}
	async componentWillUnmount() {
		eexchange.unsubscribeEvent(['open-dropdown'], this.subscribeOpenDropdownCallback);
	}

	private subscribeOpenDropdownCallback: CB<void> = (t) => {
		if (t.initiator !== this) this.close();
	};

	protected subscribeEvents(props: PROP) {
		// ��������� �������� ��� �������� ������ ������� ���������
		eexchange.subscribeEvent(['open-dropdown'], this.subscribeOpenDropdownCallback);
	}

	toggle(event: React.MouseEvent) {
		event.stopPropagation();
		event.preventDefault();

		if (this.state.isopen) { this.close(); } else { this.open(); }
		return false;
	}

	close() {
		this.setState({isopen: false});
	}

	open() {
		this.setState({ isopen: true });

		eexchange.raiseEvent({ initiator: this, name: 'open-dropdown' });
	}

	/*renderBootsrapV4() {
		return <div className="nav-item dropdown">
		</div>;
	}*/

	abstract render(): React.ReactNode;
}