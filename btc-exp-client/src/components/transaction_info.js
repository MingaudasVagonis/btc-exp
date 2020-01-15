import React from 'react'
import {Box, Text, DataTable} from 'grommet'
import EllipsisText from "react-ellipsis-text"
import moment from 'moment'

class TransactionInfo extends React.Component {

	state = {
		render: false
	}

	setRender(){
		this.setState({render: true})
	}

	renderVout(block){
		if(!block.vout)
			return null

		return (
			<React.Fragment>
				<Box className="hor-gradient" elevation="medium" round="medium" pad="small" margin={{vertical: "xsmall"}}>
    				<Text className="heavy" color="white">vout</Text>
    			</Box>
    			<DataTable
					columns={[
						{
							property: 'value',
							header: <Text className="heavy" color="#6e72e6">Value</Text>,
							primary: true,
							render : datum => <Text color="#68707f">{datum.value}</Text>
						},
						{
							property: 'hash',
							header: <Text className="heavy" color="#6e72e6">Hex</Text>,
							render: datum => (
								<Box pad={{ vertical: 'xsmall' }} className="info-row">
								    <EllipsisText text={datum.scriptPubKey.hex} length={"25"} />
								</Box>
							),
						},
						{
							property: 'address',
							header: <Text className="heavy" color="#6e72e6">Address</Text>,
							render: datum => (
								<Box pad={{ vertical: 'xsmall' }} className="info-row">
								    <EllipsisText text={datum.scriptPubKey.addresses[0]} length={"25"} />
								</Box>
							),
						},
					]}
					data={block.vout}
				/>
			</React.Fragment>
		)
	}

	render(){

		if(!this.state.render || !this.props.block)
			return null

		const {block} = this.props

		return(
			<div className="popup">
    			<div className="overlay" onClick= { _ => this.setState({render: false}) }/>
    			<div className="content" >
    				<Box background="white" round="medium" elevation="medium" pad="small" style={{maxHeight: "80vh"}} overflow="scroll">
    					<Box className="hor-gradient" elevation="medium" round="medium" pad="small">
    						<Text className="heavy" color="white">{block.hash}</Text>
    					</Box>
						<Box direction="row" justify="between" margin={{vertical:"3px", horizontal: "5px"}} style={{color: "#393e47"}}>
							<Text color="#68707f" className="heavy">Rate</Text>
							<Text color="#393e47">{block.rate}</Text>
						</Box>

						<Box direction="row" justify="between" margin={{vertical:"3px", horizontal: "5px"}}>
							<Text color="#68707f" className="heavy">Fee</Text>
							<Text color="#393e47">{block.fee}</Text>
						</Box>
						<Box direction="row" justify="between" margin={{vertical:"3px", horizontal: "5px"}}>
							<Text color="#68707f" className="heavy">Confirmations</Text>
							<Text color="#393e47">{block.confirmations}</Text>
						</Box>
						<Box direction="row" justify="between" margin={{vertical:"3px", horizontal: "5px"}}>
							<Text color="#68707f" className="heavy">Version</Text>
							<Text color="#393e47">{block.version}</Text>
						</Box>
						<Box direction="row" justify="between" margin={{vertical:"3px", horizontal: "5px"}}>
							<Text color="#68707f" className="heavy">Time</Text>
							<Text color="#393e47">{moment.unix(block.time).fromNow()}</Text>
						</Box>
						<Box className="hor-gradient" elevation="medium" round="medium" pad="small" margin={{vertical: "xsmall"}}>
    						<Text className="heavy" color="white">Outputs</Text>
    					</Box>
    					<DataTable
							columns={[
								{
								    property: 'value',
								    header: <Text className="heavy" color="#6e72e6">Value</Text>,
								    primary: true,
								    render : datum => <Text color="#68707f">{datum.value}</Text>
								},
								{
								    property: 'hash',
								    header: <Text className="heavy" color="#6e72e6">Script</Text>,
								    render: datum => (
								        <Box pad={{ vertical: 'xsmall' }} className="info-row">
								          <EllipsisText text={datum.script} length={"25"} />
								        </Box>
								    ),
								},
								{
								    property: 'address',
								    header: <Text className="heavy" color="#6e72e6">Address</Text>,
								    render: datum => (
								        <Box pad={{ vertical: 'xsmall' }} className="info-row">
								          <EllipsisText text={datum.address} length={"25"} />
								        </Box>
								    ),
								},
							]}
							data={block.outputs}
						/>
						{this.renderVout(block)}
					</Box>
    			</div>
    		</div>
		)
	}
}

export default TransactionInfo