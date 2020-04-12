/*jslint node: true */
"use strict";

const headlessWallet = require('headless-obyte');
const conf = require('ocore/conf.js');
const eventBus = require('ocore/event_bus.js');
const objectHash = require('ocore/object_hash.js');
const fetch = require('node-fetch');

let oracleAddress;

async function getData() {
	// fetch data about Apple and Facebook stock prices
	const response = await fetch(`https://financialmodelingprep.com/api/v3/quote/AAPL,FB`);

	if (response.status !== 200)
		throw new Error('non-200 status: ' + response.status);

	const stocks = await response.json();
	console.log('stocks', stocks)

	let datafeed = {};
	for (let stock of stocks)
		datafeed[stock.symbol] = stock.price.toString();
	return datafeed;
}

async function post() {
	try {
		const datafeed = await getData();
		const message = {
			app: "data_feed",
			payload: datafeed,
			// these fields are automatically added by recent versions of ocore
		//	payload_location: "inline",
		//	payload_hash: objectHash.getBase64Hash(datafeed, true),
		};
		const opts = {
			paying_addresses: [oracleAddress],
			change_address: oracleAddress,
			messages: [message]
		};
		let { unit } = await headlessWallet.sendMultiPayment(opts);
		console.log("posted data feed in unit " + unit);
	}
	catch (e) {
		console.log("posting failed", e);
	}
}

async function start() {
	oracleAddress = await headlessWallet.readSingleAddress();
	await post();
	setInterval(post, conf.POSTING_PERIOD);
}



eventBus.on('headless_wallet_ready', start);
