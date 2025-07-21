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

  




  useEffect(() => {
    const mockUsers: User[] = [
      {
        id: 1,
        name: 'asdasdasd',
        email: 'assddds@example.com',
        username: 'asdasd123',
        phoneNumber: '1234567890',
        pincode: '123456',
        district: 'Sample District',
        state: 'Sample State',
        country: 'Sample Country',
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
        username: 'helloworld',
        phoneNumber: '9876543210',
        pincode: '654321',
        district: 'Metro District',
        state: 'Metro State',
        country: 'Demo Country',
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
        username: 'cctnsuser',
        phoneNumber: '5555555555',
        pincode: '111111',
        district: 'Test District',
        state: 'Test State',
        country: 'Test Country',
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
    setShowAddUser(true)
  }

  const handleUserCreated = (newUser: User) => {
    setUsers([...users, newUser])
    setShowAddUser(false)
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
      setUsers(users.filter(u => u.id !== userToDelete.id))
      setShowDeleteConfirmation(false)
      setUserToDelete(null)
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