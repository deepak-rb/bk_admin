import React from 'react'
import { Trash2, X } from 'lucide-react'
import './Book.css'

interface DeleteConfirmationProps {
  bookName: string
  onConfirm: () => void
  onCancel: () => void
}

function DeleteConfirmation({ bookName, onConfirm, onCancel }: DeleteConfirmationProps) {
  return (
    <div className="delete-confirmation-overlay">
      <div className="delete-confirmation-modal">
        <div className="delete-confirmation-header">
          <div className="delete-icon">
            <Trash2 size={24} />
          </div>
          <h2>Delete Book</h2>
        </div>
        
        <div className="delete-confirmation-content">
          <p>Are you sure you want to delete <strong>"{bookName}"</strong>?</p>
          <p className="warning-text">This action cannot be undone.</p>
        </div>
        
        <div className="delete-confirmation-actions">
          <button 
            className="btn btn-secondary" 
            onClick={onCancel}
          >
            <X size={16} />
            Cancel
          </button>
          <button 
            className="btn btn-danger" 
            onClick={onConfirm}
          >
            <Trash2 size={16} />
            Delete Book
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteConfirmation
