import React, {useState, useCallback, ChangeEvent, useEffect} from 'react'
import {Wallet} from '../web3/wallet'
import {web3} from '../web3/web3'
import {Input} from './Input'

export const WalletExample = () => {
    const [wallet, setWallet] = useState<Wallet>()
    const [toAddress, setToAddress] = useState('')
    const [balance, setBalance] = useState('')
    const [toAddressBalance, setToAddressBalance] = useState('')
    const [pk, setPk] = useState('')

    const getBalance = useCallback(() => {
        wallet?.getBalance().then((balance) => {
            setBalance(String(web3.utils.fromWei(balance, 'ether')))
        })
    }, [wallet, setBalance])

    const getToAddressBalance = useCallback((address?: string) => {
        wallet?.getBalance(address || toAddress).then(balance => {
            setToAddressBalance(String(web3.utils.fromWei(balance, 'ether')))
        })
    }, [toAddress, wallet, setToAddressBalance])

    const handleChangeToAddress = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setToAddress(value)
        getToAddressBalance(value)
    }, [setToAddress, getToAddressBalance])

    const handleSendEther = useCallback(async () => {
        await wallet?.sendEther(toAddress, web3.utils.toWei(0.001, 'ether'))
        getToAddressBalance()
        getBalance()
    }, [toAddress, wallet, getToAddressBalance, getBalance])

    const createNewWallet = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        try {
            setWallet(new Wallet(value))
        } catch {
        }
        setPk(value)
    }, [setWallet, setPk])

    useEffect(() => {
        getBalance()
    }, [wallet, getBalance])

    return (

        <div className='Card'>
            <div className='CardHead'>
                <h2>Wallet</h2>
            </div>
            <div className='CardBody'>
                <div>
                    <div className='Block'>
                        <Input label='Set Private Key:' value={pk} onChange={createNewWallet}/>
                        {wallet && (
                            <>
                                <div>You address: {wallet && wallet.getAccount().address}</div>
                                {balance && (
                                    <div>Your balance: {balance}ETH</div>
                                )}
                            </>
                        )}
                    </div>
                    <div className='Block'>
                        {balance && (
                            <div>
                                <div className='Block'>
                                    <Input label='Send 0.001ETH to this address:' value={toAddress}
                                           onChange={handleChangeToAddress}/>
                                </div>
                                <div className='Block'>
                                    <button type='button' onClick={handleSendEther}>SEND ETHER</button>
                                </div>
                                {toAddressBalance && (
                                    <div>Recipient balance: {toAddressBalance}ETH</div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}