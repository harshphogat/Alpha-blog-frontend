import React from 'react'
import { useAppState } from '../AppState';
import Card from '../components/UserCard';

const User = (props) => {

  const {state, dispatch} = useAppState();
  const {url, users} = state

  
  React.useEffect(()=> {
    const getUsers = async() => {
      const response = await fetch(url + '/users', {
        method:'get',
        headers: {
          Authorization: "bearer " + sessionStorage.getItem('token')
        }
      })
      const users = await response.json()
      console.log('user', users)
      dispatch({type: 'getUsers', payload: users})
    }
    getUsers()
  },[])
  
  const loaded = () =>{
    return(
      <>
      <h1 className='text-center mt-4'> Bloggers </h1>
      <div className="container">
        <div className="row row-cols-3">
          {users.map(users => (
            <Card 
              id = {users.user.id}
              user = {users.user}
              email = {users.user.email} 
              username = {users.user.username}
              created={users.createdAt}
              articleCount={users.articleCount}
              key={users.user.id} />
          ))}
        </div>
      </div>
    </>
    ) 
  }
  return sessionStorage.token ? loaded() : <h1>loading... </h1>
}

export default User;