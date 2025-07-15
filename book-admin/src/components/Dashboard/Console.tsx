import React, { useState } from 'react'
import Header from './Header'
import SideBar from './SideBar'
import LoadingSpinner from './LoadingSpinner'
import Entry from '../EntryPage/Entry'
import Order from '../Order/Order'
import Reports from '../Reports/Reports'
import Settings from '../Settings/Settings'
import Book from '../Book/Book'
import BookSubmit from '../BookSubmit/BookSubmit'
import User from '../User/User'
import './Console.css'

function Console() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeComponent, setActiveComponent] = useState('dashboard')
  const [isLoading, setIsLoading] = useState(false)

  const handleNavigate = (component: string) => {
    if (component !== activeComponent) {
      setIsLoading(true)
      
      // Simulate loading time
      setTimeout(() => {
        setActiveComponent(component)
        setIsLoading(false)
      }, 1000)
    }
  }

  const renderContent = () => {
    if (isLoading) {
      return <LoadingSpinner message="Loading content..." />
    }

    switch (activeComponent) {
      case 'dashboard':
        return <Entry />
      case 'user-management':
        return <User />
      case 'book-management':
        return <Book />
      case 'order-management':
        return <Order />
      case 'book-submission':
        return <BookSubmit />
      case 'reports':
        return <Reports />
      case 'settings':
        return <Settings />
      default:
        return <Entry />
    }
  }

  return (
    <div className="console-container">
      <SideBar 
        isOpen={sidebarOpen} 
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        activeComponent={activeComponent}
        onNavigate={handleNavigate}
      />
      
      <div className={`main-content ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <Header />
        <div className="content-area">
          {renderContent()}
        </div>
      </div>
    </div>
  )
}

export default Console