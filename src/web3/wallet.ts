import { Web3PromiEvent } from 'web3-core';
import {SendSignedTransactionEvents} from 'web3-eth';
import { Receipt} from 'web3-types';
import {DataFormat} from "web3-utils";
import {Web3Account} from "web3-eth-accounts";
import Web3Eth from 'web3-eth'
import {privateKeyToAccount,signTransaction} from 'web3-eth-accounts'
const web3 = {eth : new Web3Eth(process.env.REACT_APP_PROVIDER)}

export class Wallet {

    private readonly account: Web3Account;
	public constructor(privateKey: string) {
		this.account = privateKeyToAccount(privateKey);
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
			gasPrice: String(Number(await web3.eth.getGasPrice())),
		}
		// @ts-ignore
		const signedTx = await signTransaction(tx, this.account.privateKey);

		return web3.eth.sendSignedTransaction<DataFormat>(signedTx.rawTransaction);
	}

	public getAccount(){
		return this.account
	}

	public async getBalance(address?: string) {
		return web3.eth.getBalance(address ?? this.account.address);
	}
}