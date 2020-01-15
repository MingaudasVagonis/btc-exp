import React from 'react'
import {Box} from 'grommet'
import ClipLoader from "react-spinners/ClipLoader";

const Loading = props => (
	<Box fill={true} justify="center" align="center">
		<ClipLoader 
		    size={150} 
		    color={"#6f5de1"}
		    loading={true}
        />
	</Box>

)

export default Loading
