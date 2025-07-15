import React from 'react'
import './Entry.css'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js'
import { Line, Doughnut } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
)

function User() {
  // Chart data for book sales trend
  const salesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Book Sales',
        data: [65, 59, 80, 81, 56, 95],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.1,
      },
    ],
  }

  // Chart data for user statistics
  const userStatsData = {
    labels: ['Active Users', 'Inactive Users', 'New Users'],
    datasets: [
      {
        label: 'Users',
        data: [834, 234, 166],
        backgroundColor: [
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 99, 132, 0.8)',
          'rgba(255, 205, 86, 0.8)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 205, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  }

  return (
    <div className="user-dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        {/* <p>Welcome to the Book Admin Dashboard</p> */}
      </div>
      
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Total Users</h3>
          <p className="stat-number">1,234</p>
        </div>
        <div className="stat-card">
          <h3>Active Books</h3>
          <p className="stat-number">456</p>
        </div>
        <div className="stat-card">
          <h3>Orders Today</h3>
          <p className="stat-number">78</p>
        </div>
        <div className="stat-card">
          <h3>Revenue</h3>
          <p className="stat-number">$12,345</p>
        </div>
      </div>
      
      <div className="dashboard-content">
        <div className="content-section">
          <h2>Book Sales Trend</h2>
          <div className="chart-container">
            <Line data={salesData} options={chartOptions} />
          </div>
        </div>
        
        <div className="content-section">
          <h2>User Statistics</h2>
          <div className="chart-container">
            <Doughnut data={userStatsData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default User