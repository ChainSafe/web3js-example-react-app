import React from 'react'


export const Input = (props: { label: any; value: any; onChange: any }) => {
    const {label, value, onChange} = props
    return (
        <div className='InputComponent'>
            <label className='Label'>{label}</label>
            <input value={value} onChange={onChange}/>
        </div>
    )
}