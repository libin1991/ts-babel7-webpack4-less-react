import React from "react"
import './index.less'

export default class Actionsheet extends React.Component {
    show(){
    	
    }
    
    hide(){
    	
    }
	render() {
		let style = {
			transition: 'all 6s'
		}
		return (
			<div className='popup' style={{style}}>
				{this.props.children}
			</div>
		);
	}
}