import React from 'react'
import {Text, Box, Image} from 'grommet'
import { Cluster, Notes, Money } from 'grommet-icons'

const Header = _ => (
	<Box className="header" justify="center" elevation="medium" pad={{left: "small"}}>
		<Text size="large" className="heavy" color="#7171f0">BTC explorer</Text>
	</Box>
)

class Button extends React.Component {

	constructor(props) {
	  super(props)
	
	  this.state = {
	  	selected: false,
	  	color: "#9aa1b1",
	  	class: "side-button"
	  }
	}

	toggle(call){

		this.setState(prev => ({
			class: prev.selected? "side-button" : "side-button-selected",
			color: prev.selected? "#9aa2b1" : "#6e72e6",
			selected: !prev.selected
		}))

		if(call && this.props.callback)
			this.props.callback(this.props.text)
	}

	deselect(){
		if(this.state.selected)
			this.toggle(false)
	}

	onHover(){

		if(this.state.selected)
			return

		this.setState({color: "white"})
	}

	onHoverExit(){
		if(this.state.selected)
			return

		this.setState({color: "#9aa2b1"})
	}

	getIcon(){
		switch(this.props.text){
			case "blocks": return Cluster
			case "transactions": return Notes
			case "fee": return Money
		}
	}

	render(){

		const ButtonIcon = this.getIcon()

		return(
			<Box className={this.state.class} 
				 onMouseEnter={this.onHover.bind(this)}
				 onMouseLeave={this.onHoverExit.bind(this)}
				 onClick={this.toggle.bind(this, true)}
				 width="90%" 
				 height="50px" 
				 alignSelf="center"
				 direction="row"
				 gap="small"
				 round="medium"
				 pad={{left: "large"}}
				 align="center">
				 <ButtonIcon color={this.state.color} size="medium"/>
				<Text size="large">{this.props.text}</Text>
			</Box>
		)
	}
}

const buttons = ["blocks", "transactions", "fee"]

class Sidebar extends React.Component {

	constructor(props) {
	  super(props)

	  this.buts = buttons.map( _ => React.createRef())

	}

	callback(text){

		this.buts.forEach(button => button.current.deselect())

		if(this.props.callback)
			this.props.callback(text)
	}

	render(){
		return(
			<Box className="sidebar" elevation="medium" gap="xsmall">
				<Box height="50px" width="100%" elevation="large-dark" pad="xsmall" align="end" margin={{bottom: "large"}}>
					<Image src={require("../assets/icon.png")} fit="contain" width="50px"/>
				</Box>
				{ buttons.map( (text, ind )=> <Button 
												text={text} 
												key={ind}
												callback={this.callback.bind(this)} 
												ref={this.buts[ind]}/>)
				}
			</Box>
		)
	}

}

export {
	Header, Sidebar
}