import React, { useId } from 'react'

const Selectopt = ({
    label,
    options,
    className = "",
    ...props
}, ref) => {
    const id = useId()
    return (
        <div className='w-full mt-4'>
            
            {label && <label className='inline-block mb-2 pl-1'>{label}</label>}
            
            <select
                {...props}
                id={id}
                ref={ref}
                className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
            >
                {
                    options?.map((option)=>(
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))
                }
            </select>
        </div>
    )
}

export default React.forwardRef(Selectopt)
