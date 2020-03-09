const axios = require("axios");

/**
 * Gets how many blocks there are in the block chain
 *
 * @return {number} Block count.
 */
const getBlockCount = async _ => {

	const response = await axios.post("http://localhost:8332", {
		method: "getblockcount"
	});

	return response.data.result;
};

/**
 * Gets the block according to it's height.
 *
 * @param  {number} height The height of the block.
 * @return {number} 		  Block.
 */
const getBlock = async height => {

	const response = await axios.post("http://localhost:8332", {
		method: "getblockbyheight",
		params: [height, true, false]
	});

	return response.data.result;
};

/**
 * Gets the block according to it's hash.
 *
 * @param  {string} hash The hash of the block.
 * @return {number} 		Block.
 */
const getBlockByHash = async hash => {

	const response = await axios.post("http://localhost:8332", {
		method: "getblockbyheight",
		params: [hash, true, false]
	});

	return response.data.result;
};

/**
 * Gets the blocks according to their heights.
 *
 * @param  {array} array An array containing heights of blocks to get.
 * @return {array} 		Array of blocks.
 */
const getBlocks = async array =>
	await Promise.all(array.map(height => getBlock(height)));

/**
 * Gets the blockchain's height and the last 15 blocks in the blockchain.
 *
 * @return {object} An object containing blockchain's height and the blocks.
 */
const getBlocksInfo = async _ => {
	
	const height = await getBlockCount();

	var heights = [];
	for (var i = height; i >= height - 15; i--) heights.push(i);

	const blocks = await getBlocks(heights);

	return {
		height,
		blocks
	};
};

module.exports = {
	getBlockCount,
	getBlock,
	getBlocksInfo,
	getBlockByHash
};
