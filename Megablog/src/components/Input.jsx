// forwardRef is a function that lets a parent component pass a ref to a child component, even if that child is a custom (not DOM) component.
// Normally, you can only attach ref directly to DOM elements ie html elements like div, input span, etc., not to functional components like <Input />, <Button />.
// forwardRef solves this by letting you “forward” the ref from the parent down to a specific DOM element or functional component in the child.
import {useId, forwardRef} from 'react'


const Input = forwardRef(function Input({
    label,
    type = 'text',
    className = '',
    ...props
}, ref){
    const id = useId();
    return (
        <div className='w-full'>
            {
                label && 
                    <label 
                    className='inline-block mb-2 pl-1 font-medium text-gray-700'
                    htmlFor={id}
                    >
                        {label}
                    </label>
            }
            <input type={type}
             id={id}
            className={`px-4 py-2.5 rounded-lg bg-white
            text-gray-900 outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent
            duration-200 border border-gray-300 w-full
             ${className}`}
            ref={ref}
            {...props} />

        </div>
    )
})

export default Input;
