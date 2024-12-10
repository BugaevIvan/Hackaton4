import React from 'react'
import cl from './InputText.module.css'

const InputText = React.forwardRef((props, ref) => {
    return (
        <input type="text" className={cl.InputText}{...props} ref={ref} />
    )
})

export default InputText