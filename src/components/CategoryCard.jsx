import React from "react";
import { Link } from "react-router-dom";

export default function Card({name, articleCount, created, updated, id}){

  return (
    <>
      <div className="col">
        <div className="card text-center border-dark mb-3" >
          <div className="card-body text-dark">
            <h5 className="card-title"><Link to={`${id}`}>{name} </Link></h5>
            <p className="card-text"> {articleCount} </p>
          </div>
          <div className="card-footer bg-transparent">Created {created} ago <br /> Updated {updated} ago</div>
        </div>
      </div>
    </>
  )
} 