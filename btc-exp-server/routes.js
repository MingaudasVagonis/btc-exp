const express = require("express");
const {
	getBlocksInfo,
	getBlockByHash,
	getBlock
} = require("./btc_api/blocks.js");
const {
	getNew,
	getRaw,
	getDecoded,
	getTx
} = require("./btc_api/transactions.js");

/**
* @see ./btc_api/blocks.js getBlocksInfo
*/
const getInfo = async (req, res) => {
	try {

		const response = await getBlocksInfo();

		res.status(200).json(response);

	} catch (error) {
		res.status(500).json({ error });

		console.log(error);
	}
};

/**
* @see ./btc_api/blocks.js getBlock
*/
const getBlockByHeight = async (req, res) => {
	try {

		if (!req.query.height) {
			res.status(400).json({ error: "no height specified" });
			return;
		}

		const response = await getBlock(parseInt(req.query.height));

		res.status(200).json(response);
	} catch (error) {
		res.status(500).json({ error });

		console.log(error);
	}
};

/**
* @see ./btc_api/blocks.js getBlockByHash
*/
const getBlockHeader = async (req, res) => {
	try {
		if (!req.query.hash) {
			res.status(400).json({ error: "no hash specified" });
			return;
		}

		const response = await getBlockByHash(req.query.hash);

		res.status(200).json(response);
	} catch (error) {
		res.status(500).json({ error });

		console.log(error);
	}
};

/**
* @see ./btc_api/transactions.js getNew
*/
const getNewTransactions = async (req, res) => {
	try {
		const response = await getNew(req.query.height);

		res.status(200).json(response);
	} catch (error) {
		res.status(500).json({ error });

		console.log(error);
	}
};

/**
* @see ./btc_api/transactions.js getRawTransaction
*/
const getRawTransaction = async (req, res) => {
	try {
		if (!req.query.hash) {
			res.status(400).json({ error: "no hash specified" });
			return;
		}

		const response = await getRaw(req.query.hash);

		res.status(200).json(response);
	} catch (error) {
		res.status(500).json({ error });

		console.log(error);
	}
};

/**
* @see ./btc_api/transactions.js getDecoded
*/
const decodeTransaction = async (req, res) => {
	try {
		if (!req.query.raw) {
			res.status(400).json({ error: "no raw specified" });
			return;
		}

		const response = await getDecoded(req.query.raw);

		res.status(200).json(response);
	} catch (error) {
		res.status(500).json({ error });

		console.log(error);
	}
};

/**
* @see ./btc_api/transactions.js getTx
*/
const getTransaction = async (req, res) => {
	try {
		if (!req.query.hash) {
			res.status(400).json({ error: "no hash specified" });
			return;
		}

		const response = await getTx(req.query.hash);

		res.status(200).json(response);
	} catch (error) {
		res.status(500).json({ error });

		console.log(error);
	}
};

module.exports = app => {
	
	app.route("/blocks/info").get(getInfo);

	app.route("/blocks/block").get(getBlockByHeight);

	app.route("/blocks/header").get(getBlockHeader);

	app.route("/transactions/new").get(getNewTransactions);

	app.route("/transactions/raw").get(getRawTransaction);

	app.route("/transactions").get(getTransaction);

	app.route("/transactions/decode").get(decodeTransaction);
};
