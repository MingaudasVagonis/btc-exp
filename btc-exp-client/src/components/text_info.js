import React from 'react'
import {Box, Paragraph} from 'grommet'

class TextInfo extends React.Component {

	state = {
		render: false
	}

	setRender(){
		this.setState({render: true})
	}

	render(){

		if(!this.state.render || !this.props.info)
			return null

		return(
			<div className="popup">
    			<div className="overlay" onClick= { _ => this.setState({render: false}) }/>
    			<div className="content" >
    				<Box background="white" round="medium" elevation="medium" pad="small" style={{maxWidth: "70vw", maxHeight: "70vh"}} overflow="scroll" >
    					<Box className="hor-gradient" elevation="medium" round="medium" pad={{horizontal: "small"}} >
    						<Paragraph className="heavy" color="white" >{this.props.info}</Paragraph>
    					</Box>
					</Box>
    			</div>
    		</div>
		)
	}
}

export default TextInfo