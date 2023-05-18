import React from "react";
import { Link } from "react-router-dom";
import { useAppState } from "../AppState";
import Gravatar from 'react-gravatar';

export default function Card({user, email, username, created, articleCount, id}){

  const{ state, dispatch } = useAppState();

  const actions = {

    delete: () =>{
      if (window.confirm('Are you sure you want to delete the user and all its associated articles')){
        return fetch(state.url + "/users/" + user.id ,{
          method: 'delete',
          headers: {
            Authorization: "bearer " + sessionStorage.getItem('token')
          },
        }),
        window.location.href = '/users'  
      }
    }
  }

  return (
    <>
      <div className="col">
        <div className="card text-center border-dark mb-3" >
          <div className="card-header bg-transparent"> <Link to={`/users/${id}`}>{username}</Link> </div>
          <div className="card-body text-dark">
            <h5 className="card-title"><Gravatar email= {email} /></h5>
            <p className="card-text"> {articleCount} </p>
            <Link to= {`${id}`} className="btn btn-outline-primary" > View </Link>
            {(username === sessionStorage.username) &&
              <>
                <Link to= {`${id}/edit`} className="btn btn-outline-success">Edit</Link>
                <Link to='' className="btn btn-outline-danger" onClick={() => actions['delete']()}>Delete</Link>
              </>
            }
          </div>
          <div className="card-footer bg-transparent">Joined {created} ago </div>
        </div>
      </div>
    </>
  )
} 