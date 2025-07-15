import React from 'react'
import './LoadingSpinner.css'

interface LoadingSpinnerProps {
  message?: string
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  message = 'Loading...' 
}) => {
  return (
    <div className="loading-container">
      <div className="loading-spinner">
        <div className="spinner text-primary"></div>
        <p>{message}</p>
      </div>
    </div>
  )
}

export default LoadingSpinner
