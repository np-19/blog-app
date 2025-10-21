
const Button = ({
    children, //text or elements inside the button
    type = 'button',
    bgColor = 'bg-gradient-to-r from-indigo-600 to-purple-600',
    textColor = 'text-white',
    className = '',
    disabled = false,
    ...props
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`${bgColor} ${textColor} ${className} rounded-lg py-2.5 px-6 hover:shadow-lg hover:scale-105 transition-all duration-300 font-semibold ${
        disabled ? 'opacity-50 cursor-not-allowed hover:scale-100' : 'cursor-pointer'
      }`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
