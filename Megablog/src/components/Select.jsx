import {forwardRef, useId} from 'react'

const Select = ({  //export default forwardRef(Select);
    options = [],
    label,
    className = '',
    ...props
}, ref) => {

    const id = useId();

    return (
        <div className='w-full'>
            {
                label && <label htmlFor={id} className='inline-block mb-2 pl-1 font-medium text-gray-700'>{label}</label>
            }
            <select id={id} ref={ref}
            className={`w-full rounded-lg border border-gray-300 px-4
             py-2.5 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none duration-200 bg-white text-gray-900
             ${className}`}
            {...props}>
                {options?.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>

        </div>
       
    )
}

export default forwardRef(Select);  // wrapping with forwardRef to pass ref from parent to child
