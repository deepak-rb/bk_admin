import React from 'react';
import { Link, RouterProvider } from 'react-router-dom';

function NotFound() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light">
      <div className="text-center p-5 rounded shadow bg-white">
        <h1 className="display-1 text-danger fw-bold">404</h1>
        <h2 className="mb-3">Oops! Page Not Found</h2>
        <p className="text-muted mb-4">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="btn btn-primary">
          Go to Home
        </Link>
      </div>
    </div>
  );
}
export default NotFound;
