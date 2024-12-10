import React from 'react'
import cl from './InputDate.module.scss'

const InputDate = React.forwardRef((props, ref) => {
    return (
        <div className={cl.date}>
            <div className={cl.left_from_date}>{props.title}</div>
            <input type="date" className={cl.text_field} {...props} ref={ref} />
        </div>
    )
})

export default InputDate