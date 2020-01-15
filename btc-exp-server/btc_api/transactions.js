const axios = require('axios')
const {getBlock, getBlockCount} = require('./blocks.js')

const getRaw = async hash => {
    
    const response = await axios.post('http://localhost:8332', {
      method: 'getrawtransaction',
      params: [hash, false]
    })

    return response.data.result

}

const getDecoded = async raw => {

	const response = await axios.post('http://localhost:8332', {
		method: 'decoderawtransaction',
		params: [raw]
	})

	return response.data.result
}

const getTx = async hash => {

	const response = await axios.get(`http://localhost:8332/tx/${hash}`)

	return response.data
}

const getNew = async height => {

  if(!height)
     height = Math.max( await getBlockCount() - 30000, 1) /* cuz no full node */
  else height = Math.max( height - 30000, 1) /* cuz no full node */

	const block = await getBlock( height )

	const result = await Promise.all( block.tx.map( tx => getTx(tx) ))

	return result
	
}


module.exports = {
	getRaw,
	getDecoded,
	getNew,
  getTx
}
