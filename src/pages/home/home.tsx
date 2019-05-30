import * as React from 'react';
import { connect } from 'react-redux';
import Act from 'store/actions';
import { List } from 'react-virtualized';

const list = [
	'Brian Vaughn',
	'Brian Vaughn',
	'Brian Vaughn',
	'Brian Vaughn',
	'Brian Vaughn',
	'Brian Vaughn',
	'Brian Vaughn',
	'Brian Vaughn',
	'Brian Vaughn',
	'Brian Vaughn',
	'Brian Vaughn',
	'Brian Vaughn',
	'Brian Vaughn',
	'Brian Vaughn',
	'Brian Vaughn',
	'Brian Vaughn',
	'Brian Vaughn',
	'Brian Vaughn',
	'Brian Vaughn',
	'Brian Vaughn',
	'Brian Vaughn',
	'Brian Vaughn',
	'Brian Vaughn',
	'Brian Vaughn',
	'Brian Vaughn',

	// And so on...
];

function rowRenderer({
	key, // Unique key within array of rows
	index, // Index of row within collection
	isScrolling, // The List is currently being scrolled
	isVisible, // This row is visible within the List (eg it is not an overscanned row)
	style // Style object to be applied to row (to position it)
}) {
	console.log(style, '---')
	return(
		<div
      key={key}
      style={style}
    >
      {list[index]}
    </div>
	)
}

import { dispatchFun } from 'util/callTake';

import './home.less'

export default class Home extends React.Component < any, {} > {
	componentDidMount = () => {

	}
	init = async() => {
		const init = await this.props.init({
			a: 1
		});
	}
	render() {
		return(
      <h1>222</h1>
		);
	}
}

 