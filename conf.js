/*jslint node: true */
"use strict";

//exports.port = 6611;
//exports.myUrl = 'wss://mydomain.com/bb';
exports.bServeAsHub = false;

exports.bLight = true;

exports.hub = process.env.testnet ? 'obyte.org/bb-test' : 'obyte.org/bb';

// chat config
exports.deviceName = 'Oracle example';
exports.permanent_pairing_secret = 'randomstring';
exports.control_addresses = ['DEVICE ALLOWED TO CHAT'];
exports.payout_address = 'WHERE THE MONEY CAN BE SENT TO';

exports.bSingleAddress = true;

exports.bWantNewPeers = false;

exports.POSTING_PERIOD = 3600 * 1000;

console.log('finished oracle example conf');
