import React, {useState, useCallback, ChangeEvent} from 'react'
import {web3} from '../web3/web3'
import {Input} from './Input'

export const UtilExample = () => {
    const [hex, setHex] = useState('')
    const [num, setNum] = useState('')
    const nToHex = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        try {
            setHex(web3.utils.numberToHex(value))
        } catch {
            setHex('Incorrect number')
        }
        setNum(value)
    }, [setNum, setHex])
    const hexToN = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        try {
            setNum(String(web3.utils.hexToNumber(value)))
        } catch {
            setNum('Incorrect hex')
        }
        setHex(value)
    }, [setNum, setHex])

    return (

        <div className='Card'>
            <div className='CardHead'>
                <h2>Utils</h2>
            </div>
            <div className='CardBody'>

                <div>
                    <Input label={'Hex:'} value={hex} onChange={hexToN}/>
                </div>
                <div>
                    <Input label={'Decimal:'} value={num} onChange={nToHex}/>
                </div>
            </div>
        </div>
    )
}