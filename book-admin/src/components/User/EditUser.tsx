import React, { useState } from 'react'
import { ArrowLeft, Save } from 'lucide-react'
import './User.css'
import './AddUser.css'

interface User {
  id: number
  name: string
  email: string
  username: string
  phoneNumber: string
  pincode: string
  district: string
  state: string
  country: string
  role: string
  status: 'active' | 'banned'
  joinDate: string
  lastActive: string
  avatar: string
}

interface EditUserProps {
  user: User
  onUserUpdated: (user: User) => void
  onCancel: () => void
}

function EditUser({ user, onUserUpdated, onCancel }: EditUserProps) {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    username: user.username,
    phoneNumber: user.phoneNumber,
    pincode: user.pincode,
    district: user.district,
    state: user.state,
    country: user.country,
    role: user.role,
    status: user.status
  })

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    username: '',
    phoneNumber: ''
  })

  const validateForm = () => {
    const newErrors = { name: '', email: '', username: '', phoneNumber: '' }
    let isValid = true

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
      isValid = false
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
      isValid = false
    }

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required'
      isValid = false
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters'
      isValid = false
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required'
      isValid = false
    } else if (!/^\d{10}$/.test(formData.phoneNumber.replace(/\D/g, ''))) {
      newErrors.phoneNumber = 'Phone number must be 10 digits'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    const updatedUser: User = {
      ...user,
      ...formData,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name)}&background=28a745&color=fff&size=40`
    }

    onUserUpdated(updatedUser)
  }

  return (
    <div className="add-user-container">
      <div className="add-user-header">
        <button className="btn btn-secondary" onClick={onCancel}>
          <ArrowLeft size={16} />
          Back to Users
        </button>
        <h1 className="centered-title">Edit User</h1>
      </div>

      <div className="add-user-form-container">
        <form onSubmit={handleSubmit} className="add-user-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Name *</label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className={errors.name ? 'error' : ''}
                placeholder="Enter user's full name"
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className={errors.email ? 'error' : ''}
                placeholder="Enter user's email address"
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="username">Username *</label>
              <input
                id="username"
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
                className={errors.username ? 'error' : ''}
                placeholder="Enter username"
              />
              {errors.username && <span className="error-message">{errors.username}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number *</label>
              <input
                id="phoneNumber"
                type="tel"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                className={errors.phoneNumber ? 'error' : ''}
                placeholder="Enter phone number"
              />
              {errors.phoneNumber && <span className="error-message">{errors.phoneNumber}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="pincode">Pincode</label>
              <input
                id="pincode"
                type="text"
                value={formData.pincode}
                onChange={(e) => setFormData({...formData, pincode: e.target.value})}
                placeholder="Enter pincode"
              />
            </div>

            <div className="form-group">
              <label htmlFor="district">District</label>
              <input
                id="district"
                type="text"
                value={formData.district}
                onChange={(e) => setFormData({...formData, district: e.target.value})}
                placeholder="Enter district"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="state">State</label>
              <input
                id="state"
                type="text"
                value={formData.state}
                onChange={(e) => setFormData({...formData, state: e.target.value})}
                placeholder="Enter state"
              />
            </div>

            <div className="form-group">
              <label htmlFor="country">Country</label>
              <input
                id="country"
                type="text"
                value={formData.country}
                onChange={(e) => setFormData({...formData, country: e.target.value})}
                placeholder="Enter country"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="role">Role</label>
              <select
                id="role"
                value={formData.role}
                onChange={(e) => setFormData({...formData, role: e.target.value})}
              >
                <option value="user">User</option>
                <option value="author">Author</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value as 'active' | 'banned'})}
              >
                <option value="active">Active</option>
                <option value="banned">Banned</option>
              </select>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <Save size={16} />
              Update User
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditUser
