import React from 'react'
import { useAppState } from '../AppState';
import Card from '../components/ArticleCard';
import moment from 'moment';

const Article = (props) => {

  const {state, dispatch} = useAppState();
  const {url, articles} = state

  
  React.useEffect(()=> {
    const getArticles = async() => {
      const response = await fetch(url + '/articles', {
        method:'get',
        headers: {
          Authorization: "bearer " + sessionStorage.getItem('token')
        }
      })
      const articles = await response.json()
      console.log('ar', articles)
      dispatch({type: 'getArticles', payload: articles})
    }
    getArticles()
  },[])
  
  const loaded = () =>{
    return(
      <>
      <h1 className='text-center mt-4'> Article </h1>
      <div className="container">
        <div className="row row-cols-3">
          {articles.map(articles => (
            console.log(articles),
            <Card 
              id = {articles.article.id}
              userid = {articles.user.id}
              article = {articles.article}
              title= {articles.article.title} 
              desc= {articles.article.description}
              category = {articles.categories} 
              username = {articles.user.username}
              created={moment(articles.article.created_at).fromNow()}
              updated={moment(articles.article.updated_at).fromNow()}
              key={articles.article.id} />
          ))}
        </div>
      </div>
    </>
    ) 
  }
  return sessionStorage.token ? loaded() : <h1>loading... </h1>
}

export default Article;