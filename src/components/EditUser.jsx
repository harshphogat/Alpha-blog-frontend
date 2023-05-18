import React, { useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { useAppState } from "../AppState"

const EditUser = (props) => {

  const { state, dispatch } = useAppState()

  const [formData, setFormData] = React.useState()
  const params = useParams()

  React.useEffect ( () => {
    console.log('article.id', params.id)
    const get = async() =>{
      const res = await fetch(state.url + "/users/" + params.id ,{
        method: 'get',
        headers: {
          Authorization: "bearer " + sessionStorage.getItem('token')
        },
      })
      const user = await res.json()
      console.log('article', user)
      setFormData({ id: user[0].user.id, email : user[0].user.email, username: user[0].user.username});
    }
    get()

  },[params.id])

  const actions = {
    edit: () =>{
      return fetch(state.url + "/users/" + params.id ,{
        method: 'put',
        headers: {
          Authorization: "bearer " + sessionStorage.getItem('token'),
          "Content-Type": 'application/json',
        },
        body: JSON.stringify(formData),
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
    window.sessionStorage.setItem('username', formData.username)
    window.location.href='/users'
  }

  return(
    <>
      <h2 className='text-center mt-4'>Edit User</h2>
      <div className='container'>
        <div className="row justify-content-center">
          <div className="col-10">
            <form className='shadow p-3 mb-5 bg-body rounded' onSubmit={handleSubmit}>
            <div className='row mb-3'>
                <label className='col-sm-2 col-form-label'>Email:</label>
                <div className='col-sm-10'>
                  <input type='email' className='form-control shadown rounded' placeholder='Enter your email address' name='email' value={formData?.email} onChange={handleChange}/> 
                </div>
              </div>
              <div className='row mb-3'>
                <label className='col-sm-2 col-form-label'>Username:</label>
                <div className='col-sm-10'>
                  <input type='text' className='form-control shadown rounded' placeholder='Enter your username' name='username' value={formData?.username} onChange={handleChange}/> 
                </div>
              </div>
              <div className='row mb-3'>
                <label className='col-sm-2 col-form-label'>Password:</label>
                <div className='col-sm-10'>
                  <input type='password' className='form-control shadown rounded' placeholder='Enter your password' name='password' value={formData?.password} onChange={handleChange}/> 
                </div>
              </div>
              
              <div className='row'>
                <div className='col-2'></div>
                <div className='col-5'>
                  <input type='submit' value="Edit" className='btn btn-outline-primary w-100' />
                </div>
                <div className='col-5'>
                  <Link to="/"  className='btn btn-outline-danger w-100'>Cancel</Link>
                </div>
              </div>            
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditUser;
