import React from "react";
import { Link, Route, useNavigate } from "react-router-dom";
import { useAppState } from "../AppState";

export default function Navbar(){
  const {state, dispatch} = useAppState()
  const id = sessionStorage.getItem('id')
  const current_user = sessionStorage.getItem('username')

  const actions = {
    delete: () =>{
      if (window.confirm('Are you sure you want to delete this user')){
        return fetch(state.url + "/users/" + id ,{
          method: 'delete',
          headers: {
            Authorization: "bearer " + sessionStorage.getItem('token')
          },
        }),
        dispatch({type: 'logout'})
      }
    }
  }

  const signup = (
    <>
      <li className="nav-item">
        <Link to="/login" className="nav-link">Login</Link>
      </li>
      <li className="nav-item">
        <Link to="/signup" className="nav-link">Sign Up</Link>
      </li>
    </>
  )
  
  const login = (
    <>
      <li className="nav-item">
        <Link to="/users" className="nav-link">Bloggers</Link>
      </li>
      <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          Articles
        </a>
        <ul className="dropdown-menu">
            <li>
              <Link to="/articles/new" className="dropdown-item">Create new article</Link>
            </li>                
          <li>
            <Link to="/articles" className="dropdown-item">View Articles</Link>
          </li>
        </ul>
      </li>
  
      <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          Categories
        </a>
        <ul className="dropdown-menu">
            <li>
              <Link to="/categories/new" className="dropdown-item">Create new category</Link>
            </li>
          <li>
            <Link to="/categories" className="dropdown-item"> View Categories</Link>
          </li>
        </ul>
      </li>
  
      <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          {current_user}
        </a>
        <ul className="dropdown-menu">
          <li>
            <Link to={`/users/${id}`} className="dropdown-item"> View your profile</Link>
          </li>
          <li>
            <Link to={`/users/${id}/edit`} className="dropdown-item"> Edit your profile</Link>
          </li>
          <li>
            <Link to="" className="dropdown-item text-danger" onClick={() => actions['delete']()} > Delete profile </Link>
          {/* <%= link_to "Delete profile", user_path(current_user), class: "dropdown-item text-danger", method: :delete, data: {confirm: "Are you sure?"}%> */}
          </li>
        </ul>
      </li>
      <li className="nav-item">
        <Link className="nav-link" onClick={() =>{
          dispatch({type: 'logout'})
        }}>Logout</Link>
      </li>
    </>
  )
  

  return(
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand fw-bold" id="logo">Alpha Blog</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {(state.token || sessionStorage.token) ? login : signup}
          </ul>
        </div>
      </div>
    </nav>
   )
}
