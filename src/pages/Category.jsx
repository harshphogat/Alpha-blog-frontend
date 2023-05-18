import React from 'react'
import { useAppState } from '../AppState';
import Card from '../components/CategoryCard';

const Category = (props) => {

  const {state, dispatch} = useAppState();
  const {url, categories} = state

  
  React.useEffect(()=> {
    const getCategories = async() => {
      const response = await fetch(url + '/categories', {
        method:'get',
        headers: {
          Authorization: "bearer " + sessionStorage.getItem('token')
        }
      })
      const categories = await response.json()
      console.log('ar', categories)
      dispatch({type: 'getCategories', payload: categories})
    }
    getCategories()
  },[])
  
  const loaded = () =>{
    return(
      <>
      <h1 className='text-center mt-4'> Categories </h1>
      <div className="container">
      {console.log(categories)}
        <div className="row row-cols-3">
          {categories.map(categories => (
            <Card  
              name = {categories.category.name}
              id = {categories.category.id}
              articleCount= {categories.articleCount}
              created={categories.createdAt}
              updated={categories.updatedAt}
              key={categories.category.id} />
          ))}
        </div>
      </div>
    </>
    ) 
  }
  return sessionStorage.token ? loaded() : <h1>loading... </h1>
}

export default Category;