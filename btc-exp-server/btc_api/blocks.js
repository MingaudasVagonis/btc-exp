const axios = require('axios')

const getBlockCount = async _ => {

	const response = await axios.post('http://localhost:8332', {
		method: 'getblockcount'
	})

	return response.data.result
}

const getBlock = async height => {

	const response = await axios.post('http://localhost:8332', {
		method: 'getblockbyheight',
		params: [height, true, false]
	})

	return response.data.result
}

const getBlockByHash = async hash => {

	const response = await axios.post('http://localhost:8332', {
		method: 'getblockbyheight',
		params: [hash, true, false]
	})

	return response.data.result
}


const getBlocks = async array => 
	await Promise.all( array.map( height => getBlock(height)) )

const getBlocksInfo = async _ => {

	const height = await getBlockCount()

	var heights = []
	for (var i = height; i >= height - 15; i--) 
    	heights.push(i)

    const blocks = await getBlocks(heights)

    return {
    	height,
    	blocks
    }
}


module.exports = {
	getBlockCount,
	getBlock,
	getBlocksInfo,
	getBlockByHash
}
