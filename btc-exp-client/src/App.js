import React from 'react';
import './App.css';
import {Header, Sidebar} from './components/header.js'
import {Grommet, Box, Image, Text} from 'grommet'
import BlocksWindow from './windows/blocks_window.js'
import TransactionsWindow from './windows/transactions_window.js'

class App extends React.Component {

  state = {
    window: undefined
  }

  constructor(props) {
    super(props)
  }

  sideCallback(text){
    this.setState({window: text})
  }

  switchWindows(text){

    switch(this.state.window){
      case "blocks": return <BlocksWindow/>
      case "transactions": return <TransactionsWindow/>
      default: return (
        <Box fill={true} justify="between" align="end" direction="row">
          <Box direction="column" fill="vertical" margin={{left: "medium", top:"small"}}>
            <Text className="heavy" size="8em" color="#6f5de1">Bitcoin</Text>
            <Text className="heavy" size="5em" color="#7079ef" margin={{top:"-50px"}}>Explorer</Text>
          </Box>
          <Image src={require("./assets/castle.jpg")} fit="contain"/>
        </Box>
      )
    }
  }

  render(){

    return(
      <Grommet className="App" theme={theme}>
        <Sidebar callback={this.sideCallback.bind(this)}/>
        <Box direction="column" width="100%">
          <Header/>  
          {this.switchWindows()}
        </Box>
      </Grommet>
    )

  }
}

export default App;

const theme = {
  global: {
    elevation: {
      "light": {
        "none": "none",
        "xsmall": "0px 1px 2px rgba(154,162,177, 0.20)",
        "small": "0px 2px 4px rgba(154,162,177, 0.20)",
        "medium": "0px 4px 8px rgba(154,162,177, 0.2)",
        "medium-dark": "0px 4px 8px #3e417f46",
        "large": "0px 8px 16px rgba(154,162,177, 0.2)",
        "large-dark": "0px 8px 16px #3e417f46",
        "xlarge": "0px 12px 24px rgba(154,162,177, 0.20)"
      }
    },
    focus: {
      border: {
        color: "transparent"
      }
    },
    control: {
      border:{
        color: "transparent"
      }
    }
  }
}
