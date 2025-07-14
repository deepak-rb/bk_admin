import React, { useState, useEffect, useRef } from 'react';
import {  User, Search,BookOpen } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {



  return (
    <nav className={`navbar navbar-expand-lg sticky-top shadow navbar-light bg-white`}>
      <div className="container-fluid">

     
        <a className="navbar-brand d-flex align-items-center text-decoration-none" href="#">
          <BookOpen className="me-2 text-primary" size={24} />
          <div>
            <div className="fw-bold">Literary Ledger</div>
            <small className="text-muted">Admin Panel</small>
          </div>
        </a>

       
        <div className="d-none d-md-block mx-auto" style={{ maxWidth: '400px', width: '100%' }}>
          <div className="input-group">
            <span className="input-group-text">
              <Search size={16} />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search..."
              value=""
            />
          </div>
        </div>

      
        <div className="d-flex align-items-center ms-auto">


    

        
          <div >
           <Link to="/">
    <button type="button" className="btn btn-outline-secondary">
      <User size={20} />
    </button>
  </Link>
         
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;