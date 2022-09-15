import { Web3PromiEvent } from 'web3-core';
import {SendSignedTransactionEvents} from 'web3-eth';
import { Receipt} from 'web3-types';
import {web3} from './web3';
import {DataFormat} from "web3-utils";
import {Web3Account} from "web3-eth-accounts";

export class Wallet {

    private readonly account: Web3Account;
	public constructor(privateKey: string) {
		this.account = web3.eth.accounts.privateKeyToAccount(privateKey);
	}
	public async sendEther(
		address: string,
		value: string,
	): Promise<Web3PromiEvent<Receipt, SendSignedTransactionEvents<DataFormat>>> {

		const tx = {
			from: this.account.address,
			to: address,
			value,
			gas: '21000',
			gasPrice: web3.utils.numberToHex(await web3.eth.getGasPrice()),
		}
		const signedTx = await web3.eth.accounts.signTransaction(tx, this.account.privateKey);

		return web3.eth.sendSignedTransaction<DataFormat>(signedTx.rawTransaction);
	}

	public getAccount(){
		return this.account
	}

	public async getBalance(address?: string) {
		return web3.eth.getBalance(address ?? this.account.address);
	}
}