import React from 'react'

const Container = ({children}) => {
  return (
    <div className='w-full mx-auto px-4 sm:px-6 lg:px-10'>
      {children}
    </div>
  )
}

export default Container
