import React from 'react'
import cl from './GreenButton.module.css'

const GreenButton = React.forwardRef((props, ref) => {
    return (
        <input type="button" className={cl.GreenButton} {...props} ref={ref} />
    )
})

export default GreenButton