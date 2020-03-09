const axios = require("axios");
const { getBlock, getBlockCount } = require("./blocks.js");

/**
 * Gets the raw transaction (encoded) according to it's hash.
 *
 * @param  {string} hash The hash of the transaction.
 * @return {string} 		Encoded transaction.
 */
const getRaw = async hash => {

	const response = await axios.post("http://localhost:8332", {
		method: "getrawtransaction",
		params: [hash, false]
	});

	return response.data.result;
};

/**
 * Gets the raw transaction decoded.
 *
 * @param  {string} raw Raw transaction.
 * @return {object} 	   Transaction object.
 */
const getDecoded = async raw => {

	const response = await axios.post("http://localhost:8332", {
		method: "decoderawtransaction",
		params: [raw]
	});

	return response.data.result;
};

/**
 * Gets the transaction according to it's hash.
 *
 * @param  {string} hash The hash of the transaction.
 * @return {object} 		Transaction object.
 */
const getTx = async hash => {

	const response = await axios.get(`http://localhost:8332/tx/${hash}`);

	return response.data;
};

/**
 * Gets the last N transactions in the pool.
 *
 * @param  {number} height From which block to get the transactions.
 * @return {array} 		  An array of transaction objects.
 */
const getNew = async height => {
	
	/* Subtracting 30000 as a rough guess because the blockchain 
  		was constantly downloading new blocks / hadn't downloaded 
  		the whole blockchain */

	if (!height) height = Math.max((await getBlockCount()) - 30000, 1);
	/* If no height specified take the last one*/ else
		height = Math.max(height - 30000, 1);

	const block = await getBlock(height);

	/* Getting all transactions from the block and downloading them */
	const result = await Promise.all(block.tx.map(tx => getTx(tx)));

	return result;
};

module.exports = {
	getRaw,
	getDecoded,
	getNew,
	getTx
};
