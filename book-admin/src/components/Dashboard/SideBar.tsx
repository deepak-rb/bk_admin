import React, { useState } from 'react'
import { 
  Menu, 
  X, 
  Home,
  Settings, 
  BarChart3,
  Package,
  Upload,
  ChevronRight, 
  User,
  Book
} from 'lucide-react'
import './SideBar.css'

interface SideBarProps {
  isOpen?: boolean
  onToggle?: () => void
  activeComponent?: string
  onNavigate?: (component: string) => void
}

function SideBar({ 
  isOpen: externalIsOpen, 
  onToggle: externalOnToggle,
  activeComponent = 'dashboard',
  onNavigate
}: SideBarProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(true)
  
  // Use external state if provided, otherwise use internal state
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen
  const handleToggle = externalOnToggle || (() => setInternalIsOpen(!internalIsOpen))

  const menuItems = [
    { icon: Home, label: 'Dashboard', key: 'dashboard' },
    { icon: User, label: 'User Management', key: 'user-management' },
    { icon: Book, label: 'Book Management', key: 'book-management' },
    { icon: Package, label: 'Order Management', key: 'order-management' },
    { icon: Upload, label: 'Book Submission', key: 'book-submission' },
    { icon: BarChart3, label: 'Reports', key: 'reports' },
    { icon: Settings, label: 'Settings', key: 'settings' }
  ]

  const handleMenuClick = (key: string) => {
    if (onNavigate) {
      onNavigate(key)
    }
  }

  return (
    <div className={`sidebar ${isOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <div className="sidebar-header">
        <button 
          className="sidebar-toggle-btn" 
          onClick={handleToggle}
          aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        {isOpen && <h3 className="sidebar-title">Book Admin</h3>}
      </div>
      
      <nav className="sidebar-nav">
        <ul className="sidebar-menu">
          {menuItems.map((item, index) => (
            <li key={index} className="sidebar-menu-item">
              <button 
                onClick={() => handleMenuClick(item.key)}
                className={`sidebar-menu-link ${activeComponent === item.key ? 'active' : ''}`}
                type="button"
              >
                <item.icon size={20} className="sidebar-menu-icon" />
                {isOpen && (
                  <>
                    <span className="sidebar-menu-label">{item.label}</span>
                    <ChevronRight size={16} className="sidebar-menu-chevron" />
                  </>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export default SideBar