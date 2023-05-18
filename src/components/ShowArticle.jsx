import React from 'react'
import { useAppState } from '../AppState';
import { Link, useParams } from 'react-router-dom';

const ShowArticle = (props) => {

  const params = useParams()
  const {state, dispatch} = useAppState();
  const {article} = state

  React.useEffect ( () => {
    console.log('article.id', params.id)
    const show = async() =>{
      const res = await fetch(state.url + "/articles/" + params.id ,{
        method: 'get',
        headers: {
          Authorization: "bearer " + sessionStorage.getItem('token')
        },
      })
      const article = await res.json()
      // console.log('article', article)
      dispatch({type: 'getArticle', payload: article})
    }
    show()

  },[params.id])
  
  
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

  const loaded = () =>{
    return(<>
      {article && Object.keys(article).length !== 0 &&
      <>
      <h1 className='text-center mt-4'> {article.article.title} </h1>
      <div className="container">
        <div className="col">
          <div className="card text-center border-dark mb-3" >
            <div className="card-header bg-transparent"> Created by <Link to='/user'>{article.user.username}</Link> </div>
            <div className="card-body text-dark">
              <p className="card-text"> {article.article.description}</p>
              {(article.user.username === sessionStorage.username) &&
                <>
                  <Link to= {`${params.id}/edit`} className="btn btn-outline-success" >Edit</Link>
                  <Link to='' className="btn btn-outline-danger" onClick={() => actions['delete']()}>Delete</Link>
                </>
              }
            </div>
            <div className="card-footer bg-transparent">Created {article.createdAt} ago <br /> Updated {article.updatedAt} ago</div>
          </div>
        </div>
      </div>
      </>
      }
      </>
    ) 
  }
  return sessionStorage.token ? loaded() : <h1>loading... </h1>
}

export default ShowArticle;