import React from "react";
import { Link } from "react-router-dom";
import { useAppState } from "../AppState";

export default function Card({article, title, desc, username, userid, created, updated, id, category}){

  const{ state, dispatch } = useAppState();
  console.log(category.length)
  const truncate = (str) =>{
    return str.length > 50 ? str.substring(0, 30) + "..." : str;
  }
  const actions = {

    delete: () =>{
      if (window.confirm('Are you sure you want to delete this article')){
        console.log('article.id', article.id)
        return fetch(state.url + "/articles/" + article.id ,{
          method: 'delete',
          headers: {
            Authorization: "bearer " + sessionStorage.getItem('token')
          },
        }),
        window.location.href = '/articles'  
      }
    }
  }

  return (
    <>
      <div className="col">
        <div className="card text-center border-dark mb-3" >
        {username &&
          <div className="card-header bg-transparent"> Created by <Link to={`/users/${userid}`}>{username}</Link> </div>
        }
        
          <div className="card-body text-dark">
            <h5 className="card-title">{title}</h5>
            <p className="card-text"> {truncate(desc)} </p>
            {category.length > 0 &&
              <div className="fst-italic"> <Link to={`../categories/${category[0].id}`}>{category[0].name}</Link></div>
            }
            <Link to= {`${id}`} className="btn btn-outline-primary" > View </Link>
            {(username === sessionStorage.username) &&
              <>
                <Link to= {`${id}/edit`} className="btn btn-outline-success">Edit</Link>
                <Link to='delete path' className="btn btn-outline-danger" onClick={() => actions['delete']()}>Delete</Link>
              </>
            }
          </div>
          <div className="card-footer bg-transparent">Created {created} <br /> Updated {updated}</div>
        </div>
      </div>
    </>
  )
} 