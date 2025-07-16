import React, { useState, useEffect } from 'react'
import { Ban, Plus } from 'lucide-react'
import './User.css'

interface User {
  id: number
  name: string
  email: string
  role: string
  status: 'active' | 'banned'
  joinDate: string
  lastActive: string
  avatar: string
}

function User() {
  const [users, setUsers] = useState<User[]>([])
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState<'create' | 'edit'>('create')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'user',
    status: 'active' as 'active' | 'banned'
  })

  




  useEffect(() => {
    const mockUsers: User[] = [
      {
        id: 1,
        name: 'asdasdasd',
        email: 'assddds@example.com',
        role: 'user',
        status: 'active',
        joinDate: '2024-01-15',
        lastActive: '2024-07-10',
        avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=0d6efd&color=fff&size=40'
      },
      {
        id: 2,
        name: 'Hello World',
        email: 'HelloWor@asd.com',
        role: 'author',
        status: 'active',
        joinDate: '2024-02-20',
        lastActive: '2024-07-12',
        avatar: 'https://ui-avatars.com/api/?name=Jane+Smith&background=7b1fa2&color=fff&size=40'
      },
      {
        id: 3,
        name: 'CCTNSasd',
        email: 'ctns@asddd.com',
        role: 'user',
        status: 'banned',
        joinDate: '2024-03-10',
        lastActive: '2024-07-01',
        avatar: 'https://ui-avatars.com/api/?name=Mike+Johnson&background=dc3545&color=fff&size=40'
      }
    ]
    setUsers(mockUsers)
  }, [])

  const handleCreateUser = () => {
    setModalType('create')
    setFormData({ name: '', email: '', role: 'user', status: 'active' })
    setShowModal(true)
  }



  const handleBanUser = (userId: number) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'active' ? 'banned' : 'active' }
        : user
    ))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (modalType === 'create') {
      const newUser: User = {
        id: Date.now(),
        ...formData,
        joinDate: new Date().toISOString().split('T')[0],
        lastActive: new Date().toISOString().split('T')[0],
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name)}&background=28a745&color=fff&size=40`
      }
      setUsers([...users, newUser])
    }
    
    setShowModal(false)
    setFormData({ name: '', email: '', role: 'user', status: 'active' })
  }



  return (
    <div className="user-management">
      <div className="user-header">
        <h1>User Management</h1>
        <button className="btn btn-primary" onClick={handleCreateUser}>
          <Plus size={16} />
          Add New User
        </button>
      </div>

      <div className="users-table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Join Date</th>
              <th>Last Active</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>
                  <div className="user-info">
                    <img src={user.avatar} alt={user.name} className="user-avatar" />
                    <span>{user.name}</span>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>
                  <span className={`role-badge ${user.role}`}>
                    {user.role}
                  </span>
                </td>
                <td>
                  <span className={`status-badge ${user.status}`}>
                    {user.status}
                  </span>
                </td>
                <td>{user.joinDate}</td>
                <td>{user.lastActive}</td>
                <td>
                  <div className="action-buttons">
                    <button
                      className={`btn btn-sm ${user.status === 'active' ? 'btn-danger' : 'btn-success'}`}
                      onClick={() => handleBanUser(user.id)}
                      title={user.status === 'active' ? 'Ban User' : 'Unban User'}
                    >
                      <Ban size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>






      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Create New User</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Role</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                >
                  <option value="user">User</option>
                  <option value="author">Author</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="form-group">
                <label>Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value as 'active' | 'banned'})}
                >
                  <option value="active">Active</option>
                  <option value="banned">Banned</option>
                </select>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Create User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default User