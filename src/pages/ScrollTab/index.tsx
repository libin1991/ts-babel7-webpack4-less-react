import React, {Component} from 'react';
import './index.css'
import ScrollTab from "./ScrollTab"

export default class App extends Component {
	constructor(props) {
		super(props);
	}
	render() {
	   var list=['第一页', '第二页', '第三页', '第四页','第五页'];
	   var page=[<Com text="11111"/>, <Com text="22222"/>, <Com text="33333"/>, <Com text="44444"/>,<Com text="55555"/>]
		return(
			<ScrollTab 
			   list={list} 
			   page={page}
			/>
		)
	}
}

function Com(props){
	return (
		<span>{props.text}</span>
	)
}