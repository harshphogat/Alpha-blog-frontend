import React from 'react'
import { useAppState } from '../AppState';
import { Link, useParams } from 'react-router-dom';
import Card from '../components/ArticleCard';
import Gravatar from 'react-gravatar';
import moment from 'moment';

const ShowCategory = (props) => {

  const params = useParams()
  const {state, dispatch} = useAppState();
  const {category} = state

  React.useEffect ( () => {
    console.log('article.id', params.id)
    const show = async() =>{
      const res = await fetch(state.url + "/categories/" + params.id ,{
        method: 'get',
        headers: {
          Authorization: "bearer " + sessionStorage.getItem('token')
        },
      })
      const category = await res.json()
      // console.log('article', article)
      dispatch({type: 'getCategory', payload: category})
    }
    show()

  },[params.id])
  
  

  const loaded = () =>{
    return(<>
      {category && Object.keys(category).length !== 0 &&
      <>
        <h1 className='text-center mt-4'> {category[0].category.name} </h1>
        
        <h3 className="text-center mt-4">Articles</h3>

        <div className="container">
          <div className="row row-cols-3">
            {console.log(category[0])}
            {category[0].articles.map(articles => (
              console.log('art', articles),
              <Card 
                id = {articles.id}
                article = {articles}
                title= {articles.title} 
                desc= {articles.description} 
                category = {articles}
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

export default ShowCategory;