import React from 'react'
import {Box, Text} from 'grommet'
import EllipsisText from "react-ellipsis-text"
import moment from 'moment'

class BlockInfo extends React.Component {

	state = {
		render: false
	}

	setRender(){
		this.setState({render: true})
	}

	render(){

		if(!this.state.render || !this.props.block)
			return null

		const {block} = this.props

		return(
			<div className="popup">
    			<div className="overlay" onClick= { _ => this.setState({render: false}) }/>
    			<div className="content" >
    				<Box background="white" round="medium" elevation="medium" pad="small">
    					<Text size="small" color="#9aa2b1" margin={{vertical:"3px", left: "15px"}}>{`Previous: ${block.previousblockhash}`}</Text>
    					<Box className="hor-gradient" elevation="medium" round="medium" pad="small">
    						<Text className="heavy" color="white">{block.hash}</Text>
    					</Box>
    					<Text size="small" color="#9aa2b1" margin={{vertical:"3px", left: "15px"}}>{ block.nextblockhash? `Next: ${block.nextblockhash}` : ''}</Text>
						<Box direction="row" justify="between" margin={{vertical:"3px", horizontal: "5px"}} style={{color: "#393e47"}}>
							<Text color="#68707f" className="heavy">MerkleRoot</Text>
							<EllipsisText text={block.merkleroot} length={"30"}/>
						</Box>

						<Box direction="row" justify="between" margin={{vertical:"3px", horizontal: "5px"}}>
							<Text color="#68707f" className="heavy">Height</Text>
							<Text color="#393e47">{block.height}</Text>
						</Box>
						<Box direction="row" justify="between" margin={{vertical:"3px", horizontal: "5px"}}>
							<Text color="#68707f" className="heavy">Difficulty</Text>
							<Text color="#393e47">{block.difficulty}</Text>
						</Box>
						<Box direction="row" justify="between" margin={{vertical:"3px", horizontal: "5px"}}>
							<Text color="#68707f" className="heavy">Version</Text>
							<Text color="#393e47">{block.version}</Text>
						</Box>
						<Box direction="row" justify="between" margin={{vertical:"3px", horizontal: "5px"}}>
							<Text color="#68707f" className="heavy">Mined</Text>
							<Text color="#393e47">{moment.unix(block.time).fromNow()}</Text>
						</Box>
						<Box direction="row" justify="between" margin={{vertical:"3px", horizontal: "5px"}}>
							<Text color="#68707f" className="heavy">Confirmations</Text>
							<Text color="#393e47">{block.confirmations}</Text>
						</Box>
						<Box direction="row" justify="between" margin={{vertical:"3px", horizontal: "5px"}}>
							<Text color="#68707f" className="heavy">Transaction Count</Text>
							<Text color="#393e47">{block.tx ? block.tx.length : "ø"}</Text>
						</Box>
					</Box>
    			</div>
    		</div>
		)
	}
}

export default BlockInfo