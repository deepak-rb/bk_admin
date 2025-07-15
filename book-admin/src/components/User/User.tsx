import React, { useState, useEffect } from 'react'
import { Trash2, Edit3, Ban, Plus, Search, Eye, BookOpen, ShoppingCart, User as UserIcon } from 'lucide-react'
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

interface UserHistory {
  type: 'rental' | 'purchase'
  bookTitle: string
  date: string
  amount: number
  status: string
}

interface UploadedBook {
  id: number
  title: string
  genre: string
  uploadDate: string
  status: string
  downloads: number
}

function User() {
  const [users, setUsers] = useState<User[]>([])
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [showUserDetails, setShowUserDetails] = useState(false)
  const [modalType, setModalType] = useState<'create' | 'edit'>('create')
  const [searchTerm, setSearchTerm] = useState('')
  const [userHistory, setUserHistory] = useState<UserHistory[]>([])
  const [uploadedBooks, setUploadedBooks] = useState<UploadedBook[]>([])
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'user',
    status: 'active' as 'active' | 'banned'
  })

  // Mock data initialization
  useEffect(() => {
    const mockUsers: User[] = [
      {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        role: 'user',
        status: 'active',
        joinDate: '2024-01-15',
        lastActive: '2024-07-10',
        avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=0d6efd&color=fff&size=40'
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'jane@example.com',
        role: 'author',
        status: 'active',
        joinDate: '2024-02-20',
        lastActive: '2024-07-12',
        avatar: 'https://ui-avatars.com/api/?name=Jane+Smith&background=7b1fa2&color=fff&size=40'
      },
      {
        id: 3,
        name: 'Mike Johnson',
        email: 'mike@example.com',
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

  const handleEditUser = (user: User) => {
    setModalType('edit')
    setSelectedUser(user)
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status
    })
    setShowModal(true)
  }

  const handleDeleteUser = (userId: number) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== userId))
    }
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
    } else if (selectedUser) {
      setUsers(users.map(user => 
        user.id === selectedUser.id 
          ? { ...user, ...formData }
          : user
      ))
    }
    
    setShowModal(false)
    setFormData({ name: '', email: '', role: 'user', status: 'active' })
    setSelectedUser(null)
  }

  const handleViewUserDetails = (user: User) => {
    setSelectedUser(user)
    
    // Mock user history data
    const mockHistory: UserHistory[] = [
      { type: 'purchase', bookTitle: 'React Guide', date: '2024-07-01', amount: 29.99, status: 'completed' },
      { type: 'rental', bookTitle: 'JavaScript Basics', date: '2024-06-15', amount: 9.99, status: 'active' },
      { type: 'purchase', bookTitle: 'TypeScript Handbook', date: '2024-05-20', amount: 39.99, status: 'completed' }
    ]
    
    // Mock uploaded books data
    const mockBooks: UploadedBook[] = [
      { id: 1, title: 'Advanced React Patterns', genre: 'Technology', uploadDate: '2024-03-15', status: 'approved', downloads: 245 },
      { id: 2, title: 'Modern CSS Techniques', genre: 'Design', uploadDate: '2024-04-20', status: 'pending', downloads: 0 }
    ]
    
    setUserHistory(mockHistory)
    setUploadedBooks(mockBooks)
    setShowUserDetails(true)
  }

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="user-management">
      <div className="user-header">
        <h1>User Management</h1>
        <button className="btn btn-primary" onClick={handleCreateUser}>
          <Plus size={16} />
          Add New User
        </button>
      </div>

      <div className="search-section">
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
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
            {filteredUsers.map(user => (
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
                      className="btn btn-sm btn-info"
                      onClick={() => handleViewUserDetails(user)}
                      title="View Details"
                    >
                      <Eye size={14} />
                    </button>
                    <button
                      className="btn btn-sm btn-warning"
                      onClick={() => handleEditUser(user)}
                      title="Edit User"
                    >
                      <Edit3 size={14} />
                    </button>
                    <button
                      className={`btn btn-sm ${user.status === 'active' ? 'btn-danger' : 'btn-success'}`}
                      onClick={() => handleBanUser(user.id)}
                      title={user.status === 'active' ? 'Ban User' : 'Unban User'}
                    >
                      <Ban size={14} />
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDeleteUser(user.id)}
                      title="Delete User"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create/Edit User Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{modalType === 'create' ? 'Create New User' : 'Edit User'}</h2>
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
                  {modalType === 'create' ? 'Create User' : 'Update User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* User Details Modal */}
      {showUserDetails && selectedUser && (
        <div className="modal-overlay">
          <div className="modal-content user-details-modal">
            <h2>User Details: {selectedUser.name}</h2>
            
            <div className="user-details-tabs">
              <div className="tab-content">
                <div className="user-info-section">
                  <h3>Basic Information</h3>
                  <div className="info-grid">
                    <div className="info-item">
                      <label>Name:</label>
                      <span>{selectedUser.name}</span>
                    </div>
                    <div className="info-item">
                      <label>Email:</label>
                      <span>{selectedUser.email}</span>
                    </div>
                    <div className="info-item">
                      <label>Role:</label>
                      <span className={`role-badge ${selectedUser.role}`}>
                        {selectedUser.role}
                      </span>
                    </div>
                    <div className="info-item">
                      <label>Status:</label>
                      <span className={`status-badge ${selectedUser.status}`}>
                        {selectedUser.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="history-section">
                  <h3><ShoppingCart size={20} /> Purchase & Rental History</h3>
                  <div className="history-table-container">
                    <table className="history-table">
                      <thead>
                        <tr>
                          <th>Type</th>
                          <th>Book Title</th>
                          <th>Date</th>
                          <th>Amount</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {userHistory.map((item, index) => (
                          <tr key={index}>
                            <td>
                              <span className={`type-badge ${item.type}`}>
                                {item.type}
                              </span>
                            </td>
                            <td>{item.bookTitle}</td>
                            <td>{item.date}</td>
                            <td>${item.amount}</td>
                            <td>
                              <span className={`status-badge ${item.status}`}>
                                {item.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="uploaded-books-section">
                  <h3><BookOpen size={20} /> Uploaded Books</h3>
                  <div className="books-table-container">
                    <table className="books-table">
                      <thead>
                        <tr>
                          <th>Title</th>
                          <th>Genre</th>
                          <th>Upload Date</th>
                          <th>Status</th>
                          <th>Downloads</th>
                        </tr>
                      </thead>
                      <tbody>
                        {uploadedBooks.map(book => (
                          <tr key={book.id}>
                            <td>{book.title}</td>
                            <td>{book.genre}</td>
                            <td>{book.uploadDate}</td>
                            <td>
                              <span className={`status-badge ${book.status}`}>
                                {book.status}
                              </span>
                            </td>
                            <td>{book.downloads}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-actions">
              <button
                className="btn btn-secondary"
                onClick={() => setShowUserDetails(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default User