import React, { useState, useEffect } from 'react'
import { Ban, Plus, Edit, Trash2 } from 'lucide-react'
import AddUser from './AddUser'
import EditUser from './EditUser'
import DeleteConfirmation from './DeleteConfirmation'
import './User.css'

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

function User() {
  const [users, setUsers] = useState<User[]>([])
  const [showAddUser, setShowAddUser] = useState(false)
  const [showEditUser, setShowEditUser] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
  const [userToDelete, setUserToDelete] = useState<User | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(5)

  




  useEffect(() => {
    const mockUsers: User[] = [
      

        {
    id: 1,
    name: 'Arun Prakash',
    email: 'arunp@example.com',
    username: 'arun_p',
    phoneNumber: '9876543211',
    pincode: '695001',
    district: 'Thiruvananthapuram',
    state: 'Kerala',
    country: 'India',
    role: 'admin',
    status: 'active',
    joinDate: '2024-01-10',
    lastActive: '2025-07-20',
    avatar: 'https://ui-avatars.com/api/?name=Arun+Prakash&background=0d6efd&color=fff&size=40'
  },
  {
    id: 2,
    name: 'Leena George',
    email: 'leena.g@example.com',
    username: 'leenag',
    phoneNumber: '9847123456',
    pincode: '600001',
    district: 'Chennai',
    state: 'Tamil Nadu',
    country: 'India',
    role: 'editor',
    status: 'active',
    joinDate: '2024-03-22',
    lastActive: '2025-07-19',
    avatar: 'https://ui-avatars.com/api/?name=Leena+George&background=ff5722&color=fff&size=40'
  },
  {
    id: 3,
    name: 'Ravi Kumar',
    email: 'ravi.k@domain.com',
    username: 'ravikumar',
    phoneNumber: '9988776655',
    pincode: '500001',
    district: 'Hyderabad',
    state: 'Telangana',
    country: 'India',
    role: 'user',
    status: 'active',
    joinDate: '2023-11-15',
    lastActive: '2024-12-01',
    avatar: 'https://ui-avatars.com/api/?name=Ravi+Kumar&background=4caf50&color=fff&size=40'
  },
  {
    id: 4,
    name: 'Fatima Noor',
    email: 'fatima.noor@example.com',
    username: 'fatima_n',
    phoneNumber: '7865432109',
    pincode: '110001',
    district: 'New Delhi',
    state: 'Delhi',
    country: 'India',
    role: 'moderator',
    status: 'active',
    joinDate: '2024-06-05',
    lastActive: '2025-07-20',
    avatar: 'https://ui-avatars.com/api/?name=Fatima+Noor&background=03a9f4&color=fff&size=40'
  },
  {
    id: 5,
    name: 'John Mathew',
    email: 'john.mathew@outlook.com',
    username: 'johnm',
    phoneNumber: '9443322110',
    pincode: '682001',
    district: 'Kochi',
    state: 'Kerala',
    country: 'India',
    role: 'user',
    status: 'active',
    joinDate: '2024-05-10',
    lastActive: '2025-07-18',
    avatar: 'https://ui-avatars.com/api/?name=John+Mathew&background=795548&color=fff&size=40'
  },
  {
    id: 6,
    name: 'Priya Sharma',
    email: 'priya.sharma@gmail.com',
    username: 'priyash',
    phoneNumber: '9123456780',
    pincode: '700001',
    district: 'Kolkata',
    state: 'West Bengal',
    country: 'India',
    role: 'author',
    status: 'active',
    joinDate: '2024-04-03',
    lastActive: '2025-07-19',
    avatar: 'https://ui-avatars.com/api/?name=Priya+Sharma&background=9c27b0&color=fff&size=40'
  },
  {
    id: 7,
    name: 'Deepak Singh',
    email: 'deepaksingh@mail.com',
    username: 'dpsingh',
    phoneNumber: '9876012345',
    pincode: '380001',
    district: 'Ahmedabad',
    state: 'Gujarat',
    country: 'India',
    role: 'user',
    status: 'banned',
    joinDate: '2024-02-18',
    lastActive: '2024-12-30',
    avatar: 'https://ui-avatars.com/api/?name=Deepak+Singh&background=dc3545&color=fff&size=40'
  },
  {
    id: 8,
    name: 'Neha Das',
    email: 'neha.das@example.com',
    username: 'nehadas',
    phoneNumber: '8888999900',
    pincode: '751001',
    district: 'Bhubaneswar',
    state: 'Odisha',
    country: 'India',
    role: 'admin',
    status: 'active',
    joinDate: '2024-08-01',
    lastActive: '2025-07-20',
    avatar: 'https://ui-avatars.com/api/?name=Neha+Das&background=ff9800&color=fff&size=40'
  },
  {
    id: 9,
    name: 'Manoj Pillai',
    email: 'manoj.pillai@example.in',
    username: 'manojp',
    phoneNumber: '9012345678',
    pincode: '695003',
    district: 'Kollam',
    state: 'Kerala',
    country: 'India',
    role: 'editor',
    status: 'active',
    joinDate: '2023-12-12',
    lastActive: '2024-10-05',
    avatar: 'https://ui-avatars.com/api/?name=Manoj+Pillai&background=2196f3&color=fff&size=40'
  },
  {
    id: 10,
    name: 'Sneha Reddy',
    email: 'sneha.reddy@example.com',
    username: 'snehareddy',
    phoneNumber: '9988776655',
    pincode: '500032',
    district: 'Secunderabad',
    state: 'Telangana',
    country: 'India',
    role: 'user',
    status: 'active',
    joinDate: '2024-07-01',
    lastActive: '2025-07-21',
    avatar: 'https://ui-avatars.com/api/?name=Sneha+Reddy&background=607d8b&color=fff&size=40'
  }



]
    setUsers(mockUsers)
  }, [])

  const handleCreateUser = () => {
    setShowAddUser(true)
  }

  const handleUserCreated = (newUser: User) => {
    const updatedUsers = [...users, newUser]
    setUsers(updatedUsers)
    setShowAddUser(false)
    
    // Navigate to the last page where the new user will appear
    const newTotalPages = Math.ceil(updatedUsers.length / itemsPerPage)
    setCurrentPage(newTotalPages)
  }

  const handleCancelAddUser = () => {
    setShowAddUser(false)
  }

  const handleEditUser = (user: User) => {
    setSelectedUser(user)
    setShowEditUser(true)
  }

  const handleUserUpdated = (updatedUser: User) => {
    setUsers(users.map(user => 
      user.id === updatedUser.id ? updatedUser : user
    ))
    setShowEditUser(false)
    setSelectedUser(null)
  }

  const handleCancelEditUser = () => {
    setShowEditUser(false)
    setSelectedUser(null)
  }

  const handleDeleteUser = (user: User) => {
    setUserToDelete(user)
    setShowDeleteConfirmation(true)
  }

  const confirmDeleteUser = () => {
    if (userToDelete) {
      const updatedUsers = users.filter(u => u.id !== userToDelete.id)
      setUsers(updatedUsers)
      setShowDeleteConfirmation(false)
      setUserToDelete(null)
      
      // Adjust current page if necessary
      const newTotalPages = Math.ceil(updatedUsers.length / itemsPerPage)
      if (currentPage > newTotalPages && newTotalPages > 0) {
        setCurrentPage(newTotalPages)
      } else if (updatedUsers.length === 0) {
        setCurrentPage(1)
      }
    }
  }

  const cancelDeleteUser = () => {
    setShowDeleteConfirmation(false)
    setUserToDelete(null)
  }



  const handleBanUser = (userId: number) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'active' ? 'banned' : 'active' }
        : user
    ))
  }

  // Pagination calculations
  const totalPages = Math.ceil(users.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentUsers = users.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage)
    setCurrentPage(1) // Reset to first page when changing items per page
  }

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }



  return (
    <div className="user-management">
      {showAddUser ? (
        <AddUser 
          onUserCreated={handleUserCreated}
          onCancel={handleCancelAddUser}
        />
      ) : showEditUser && selectedUser ? (
        <EditUser 
          user={selectedUser}
          onUserUpdated={handleUserUpdated}
          onCancel={handleCancelEditUser}
        />
      ) : (
        <>
          <div className="user-header">
            <h1>User Management</h1>
            <button className="btn btn-primary" onClick={handleCreateUser}>
              <Plus size={16} />
              Add New User
            </button>
          </div>

          <div className="users-table-container">
            <div className="pagination-controls-top">
              <div className="items-per-page">
                <label htmlFor="itemsPerPage">Items</label>
                <select 
                  id="itemsPerPage"
                  value={itemsPerPage} 
                  onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
                  className="form-select"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={15}>15</option>
                  <option value={20}>20</option>
                </select>
              </div>
              <div className="pagination-info">
                Showing {startIndex + 1} to {Math.min(endIndex, users.length)} of {users.length} users
              </div>
            </div>

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
                {currentUsers.map(user => (
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
                          onClick={() => handleEditUser(user)}
                          title="Edit User"
                        >
                          <Edit size={14} />
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
                          onClick={() => handleDeleteUser(user)}
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

            {totalPages > 1 && (
              <div className="pagination-controls">
                <button 
                  className="btn btn-outline-secondary"
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                
                <div className="page-numbers">
                  {Array.from({ length: totalPages }, (_, index) => {
                    const page = index + 1;
                    const isCurrentPage = page === currentPage;
                    
                    // Show first page, last page, current page, and pages around current page
                    if (
                      page === 1 || 
                      page === totalPages || 
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={page}
                          className={`btn ${isCurrentPage ? 'btn-primary' : 'btn-outline-secondary'}`}
                          onClick={() => handlePageChange(page)}
                        >
                          {page}
                        </button>
                      );
                    } else if (page === currentPage - 2 || page === currentPage + 2) {
                      return <span key={page} className="pagination-ellipsis">...</span>;
                    }
                    return null;
                  })}
                </div>
                
                <button 
                  className="btn btn-outline-secondary"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </>
      )}
      
      {showDeleteConfirmation && userToDelete && (
        <DeleteConfirmation
          userName={userToDelete.name}
          onConfirm={confirmDeleteUser}
          onCancel={cancelDeleteUser}
        />
      )}
    </div>
  )
}

export default User