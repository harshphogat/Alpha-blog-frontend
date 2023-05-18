import React, { useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { useAppState } from "../AppState"

const EditArticle = (props) => {

  const { state, dispatch } = useAppState()
  const {categories} = state

  const [formData, setFormData] = React.useState()
  const params = useParams()
  console.log(formData)

  React.useEffect ( () => {
    console.log('article.id', params.id)
    const get = async() =>{
      const res = await fetch(state.url + "/articles/" + params.id ,{
        method: 'get',
        headers: {
          Authorization: "bearer " + sessionStorage.getItem('token')
        },
      })
      const article = await res.json()
      console.log('article', article[0].categories[0].id)
      setFormData({ id: article[0].article.id, title : article[0].article.title, description: article[0].article.description, category: article[0].categories[0].id});
    }
    get()

    const getCategories = async() => {
      const response = await fetch(state.url + '/categories', {
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
  },
  [params.id])

  const actions = {
    edit: () =>{
      return fetch(state.url + "/articles/" + params.id ,{
        method: 'put',
        headers: {
          Authorization: "bearer " + sessionStorage.getItem('token'),
          "Content-Type": 'application/json',
        },
        body: JSON.stringify(formData)
      })
    }
  }
  const handleChange = (event) => {
    setFormData({...formData, [event.target.name] : event.target.value});
  };


  const handleSubmit = (event) => {
    console.log('Hello')
    event.preventDefault()
    actions['edit']()
    window.location.href='/articles'
  }

  return(
    <>
      <h2 className='text-center mt-4'>Edit Article</h2>
      <div className='container'>
        <div className="row justify-content-center">
          <div className="col-10">
            <form className='shadow p-3 mb-5 bg-body rounded' onSubmit={handleSubmit}>
              <div className='row mb-3'>
                <label className='col-sm-2 col-form-label'>Title</label>
                <div className='col-sm-10'>
                  <input type='text' className='form-control shadown rounded' placeholder='Title of article' name="title" value={formData ? formData.title : ''} onChange={handleChange}/> 
                </div>
              </div>
              
              <div className='row mb-3'>
                <label className='col-sm-2 col-form-label'>Description</label>
                <div className='col-sm-10'>
                  <textarea className='form-control shadown rounded' rows={6} placeholder='Article content' name="description" value={formData ? formData.description : ''} onChange={handleChange}/> 
                </div>
              </div>
              

              <div className='row mb-3'>
                <label className='col-sm-2 col-form-label'>Category</label>
                <div className='col-sm-10'>
                  <select className="form-select" aria-label="Default select example" name= 'category' value={formData ? formData.category : ''} onChange={handleChange}>
                    <option selected>Open this select menu</option>
                    {categories.map(categories => (
                      <option key={categories.category.id} value={categories.category.id}>{categories.category.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className='row'>
                <div className='col-2'></div>
                <div className='col-5'>
                  <input type='submit' value="Edit" className='btn btn-outline-primary w-100' />
                </div>
                <div className='col-5'>
                  <Link to="/articles"  className='btn btn-outline-danger w-100'>Cancel</Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditArticle;
