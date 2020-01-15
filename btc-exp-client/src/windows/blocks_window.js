import React from 'react'
import {Box, Text, DataTable, TextInput} from 'grommet'
import axios from 'axios'
import EllipsisText from "react-ellipsis-text"
import moment from 'moment'
import {Ascend, Search} from 'grommet-icons'
import BlockInfo from '../components/block_info.js'
import Loading from '../components/loading.js'

class BlocksWindow extends React.Component {

	state = {
		height: "waiting",
		blocks: [],
		selectedBlock: undefined,
	}

	constructor(props) {
	  super(props)

	  this.infoWindow = React.createRef()

	}
	
	componentDidMount(){
		this.fetch()
	}

	async fetch(){

		try {
			const response = await axios.get('http://localhost:8080/blocks/info')

			if(response.status !== 200)
				return
			
			this.setState({height: response.data.height, blocks: response.data.blocks})
		} catch(err){
			console.log(err)
		}
		
	}

	async searchByHash(){
		try {

			const response = await axios.get('http://localhost:8080/blocks/header',{
				params: {
					hash: this.state.searchByHash
				}
			})

			if(response.status !== 200)
				return

			this.setState({selectedBlock: response.data})
			
			this.infoWindow.current.setRender()

		} catch(err) {
			console.log(err)
		}
	}

	async searchByHeight(){
		try {

			const response = await axios.get('http://localhost:8080/blocks/block', {
				params: {
					height: this.state.search
				}
			})
			
			if(response.status !== 200)
				return

			this.setState({selectedBlock: response.data})

			this.infoWindow.current.setRender()

		} catch(err) {
			console.log(err)
		}
	}

	calculateElapsed(timestamp){
		return moment.unix(timestamp).fromNow()
	}

	renderBlockInfo(selectedBlock){

		this.setState({selectedBlock})

		this.infoWindow.current.setRender()
	}

	render(){

		if(this.state.blocks.length < 1)
			return <Loading/>

		return (
			<Box pad="medium" width="100%" animation="fadeIn">
				<Text className="heavy" color="#68707f" size="large">{`Blockchain height: ${this.state.height}`}</Text>
				<Box direction="row" width="100%" gap="medium">
					<Box background="white" round="medium" elevation="medium" margin={{top:"medium"}} pad="small" overflow="scroll"  style={{maxHeight: "83vh"}}>
						<DataTable
						  columns={[
						    {
						      property: 'height',
						      header: <Text className="heavy" color="#6e72e6">Height</Text>,
						      primary: true,
						      render : datum => <Text color="#68707f">{datum.height}</Text>
						    },
						    {
						      property: 'hash',
						      header: <Text className="heavy" color="#6e72e6">Hash</Text>,
						      render: datum => (
						        <Box pad={{ vertical: 'xsmall' }} className="info-row">
						          <EllipsisText text={datum.hash} length={"30"} />
						        </Box>
						      ),
						    },
						    {
						      property: 'time',
						      header: <Text className="heavy" color="#6e72e6">Mined</Text>,
						      render: datum => (
						        <Box pad={{ vertical: 'xsmall' }} className="info-row">
						          <Text>{this.calculateElapsed(datum.time)}</Text>
						        </Box>
						      ),
						    },
						    {
						      property: 'size',
						      header: <Text className="heavy" color="#6e72e6">Size</Text>,
						      render: datum => (
						        <Box pad={{ vertical: 'xsmall' }} className="info-row" width="8vw">
						          <Text textAlign="end">{`${datum.size} bytes`}</Text>
						        </Box>
						      ),
						    },
						    {
						      property: 'bits',
						      header: '',
						      render: datum => (
						        <Box 
						        	pad="small" 
						        	className="hor-gradient" 
						        	width="3vw" 
						        	round="medium" 
						        	elevation="medium" 
						        	align="center"
						        	onClick={this.renderBlockInfo.bind(this, datum)}
						        >
						          <Ascend color="white" size="1.3vw"/>
						        </Box>
						      ),
						    },
						  ]}
						  data={this.state.blocks}
						/>
					</Box>
					<Box direction="column" gap="medium" margin={{top: "medium"}}>
						<Box round="medium" elevation="medium" background="white" pad="small" height="fit-content">
							<TextInput
								placeholder="Block Height"
	      						value={this.state.search}
	     					    onChange={e => this.setState({search: e.target.value})}
	    					/>
	    					<Box round="medium" 
	    						 className="hor-gradient" 
	    						 pad={{vertical:"small"}} 
	    						 align="center"
	    						 onClick={this.searchByHeight.bind(this)}
	    					>
	    						<Search size="medium" color="white"/>
	    					</Box>
						</Box>
						<Box round="medium" elevation="medium" background="white" pad="small" height="fit-content">
							<TextInput
								placeholder="Block Hash"
	      						value={this.state.searchHash}
	     					    onChange={e => this.setState({searchHash: e.target.value})}
	    					/>
	    					<Box round="medium" 
	    						 className="hor-gradient" 
	    						 pad={{vertical:"small"}} 
	    						 align="center"
	    						 onClick={this.searchByHash.bind(this)}
	    						>
	    						<Search size="medium" color="white"/>
	    					</Box>
						</Box>
					</Box>
				</Box>
				<BlockInfo block={this.state.selectedBlock} ref={this.infoWindow}/>
			</Box>
		)
	}
}

export default BlocksWindow