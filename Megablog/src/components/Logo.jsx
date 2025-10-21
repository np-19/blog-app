import React from 'react'

const Logo = ({ width = '100px' }) => {
  return (
    <div>
      <img className='h-10' src="./vite.svg" alt="Logo" style={{ width }} />
    </div>
  )
}

export default Logo
