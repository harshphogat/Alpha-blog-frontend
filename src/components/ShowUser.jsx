import React from 'react'
import { useAppState } from '../AppState';
import { Link, useParams } from 'react-router-dom';
import Card from '../components/ArticleCard';
import Gravatar from 'react-gravatar';
import moment from 'moment';

const ShowUser = (props) => {

  const params = useParams()
  const {state, dispatch} = useAppState();
  const {user} = state

  React.useEffect ( () => {
    console.log('article.id', params.id)
    const show = async() =>{
      const res = await fetch(state.url + "/users/" + params.id ,{
        method: 'get',
        headers: {
          Authorization: "bearer " + sessionStorage.getItem('token')
        },
      })
      const user = await res.json()
      // console.log('article', article)
      dispatch({type: 'getUser', payload: user})
    }
    show()

  },[params.id])
  
  
  const actions = {
    delete: () =>{
      if (window.confirm('Are you sure you want to delete this user')){
        console.log('article.id', user.id)
        return fetch(state.url + "/users/" + user.id ,{
          method: 'delete',
          headers: {
            Authorization: "bearer " + sessionStorage.getItem('token')
          },
        }),
        dispatch({type: 'logout'})
      }
    }
  }

  const loaded = () =>{
    return(<>
      {user && Object.keys(user).length !== 0 &&
      <>
        <h1 className='text-center mt-4'> {user.user.username}'s Profile </h1>
        
        <Gravatar email = {user.user.email} className= "rounded shadow mx-auto d-block mt-2" size={150} />
        <div className='text-center mt-4'>
          {(user.user.username === sessionStorage.username) &&
            <>
              <Link to= {`${params.id}/edit`} className="btn btn-outline-success">Edit</Link>
              <Link to='' className="btn btn-outline-danger" onClick={() => actions['delete']()}>Delete</Link>
            </>
          }
        </div>

        <h3 className="text-center mt-4">Articles</h3>

        <div className="container">
          <div className="row row-cols-3">
            {user.articles.map(articles => (
              <Card 
                id = {articles.id}
                article = {articles}
                title= {articles.title} 
                desc= {articles.description} 
                username = {user.user.username}
                category={articles}
                created={moment(articles.created_at).fromNow()}
                updated={moment(articles.updated_at).fromNow()}
                key={articles.id} />
            ))}
          </div>
        </div>
      </>
      }
      </>
    ) 
  }
  return sessionStorage.token ? loaded() : <h1>loading... </h1>
}

export default ShowUser;