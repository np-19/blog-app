import React from 'react'

const LoadingBar = ({ message = "Loading..." }) => {
  return (
    <div className="w-full py-8 animate-scale-fade">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-4">
          <h2 className="text-xl animate-pulse font-semibold text-gray-700">{message}</h2>
        </div>
        <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden shadow-inner">
          <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 rounded-full animate-loading-bar"></div>
        </div>
      </div>
    </div>
  )
}

export default LoadingBar
