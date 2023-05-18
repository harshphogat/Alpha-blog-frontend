import React from 'react'
import { Link } from 'react-router-dom';
import { useAppState } from '../AppState';

const Signup = (props) => {

  const [formData, setFormData] = React.useState({
    username: "",
    email: "",
    password: ""
  });

  const {state, dispatch } = useAppState();

  const action = {
    signup: () => {
      return fetch(state.url + '/signup', {
        method: 'post',
        headers: {
          "Content-Type": "application/json"
        },
        body:JSON.stringify(formData)
      }).then ((response => response.json()
      )).then(res => {
        const {token, user} = res;
        if(user){
          window.sessionStorage.setItem('token' ,token)
          window.sessionStorage.setItem('id', user.id)
          window.sessionStorage.setItem('username', user.username)
          dispatch({type: 'auth', payload: {token, email: user.email, username: user.username}})
        }
      })
    }
  };

  const handleChange = (event) => {
    setFormData({...formData, [event.target.name] : event.target.value});
  };

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('submit', event)
    action['signup']()
  }

  return (
    <>
      <h2 className='text-center mt-4'>Signup</h2>
      <div className='container'>
        <div className="row justify-content-center">
          <div className="col-10">
            <form className='shadow p-3 mb-5 bg-body rounded' onSubmit={handleSubmit}>
              <div className='row mb-3'>
                <label className='col-sm-2 col-form-label'>Email:</label>
                <div className='col-sm-10'>
                  <input type='email' className='form-control shadown rounded' placeholder='Enter your email address' name='email' value={formData.email} onChange={handleChange}/> 
                </div>
              </div>
              <div className='row mb-3'>
                <label className='col-sm-2 col-form-label'>Username:</label>
                <div className='col-sm-10'>
                  <input type='text' className='form-control shadown rounded' placeholder='Enter your username' name='username' value={formData.username} onChange={handleChange}/> 
                </div>
              </div>
              <div className='row mb-3'>
                <label className='col-sm-2 col-form-label'>Password:</label>
                <div className='col-sm-10'>
                  <input type='password' className='form-control shadown rounded' placeholder='Enter your password' name='password' value={formData.password} onChange={handleChange}/> 
                </div>
              </div>
              
              <div className='row'>
                <div className='col-2'></div>
                <div className='col-5'>
                  <input type='submit' value="Signup" className='btn btn-outline-primary w-100' />
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

export default Signup;