import React, { useContext, useReducer } from 'react'
/////////////////////////
// Initial State
/////////////////////////

const initialstate = {
  url: "http://localhost:3000",
  token: null,
  email: null,
  username: null,
  articles:[],
  article:{},
  new: {
    title: '',
    description: '',
    category: []
  },
  edit: {
    id:0,
    title: '',
    description: '',
    category: []
  },
  users:[],
  user:[],
  categories:[],
  category:[]
}




/////////////////////////
// Reducer
/////////////////////////

const reducer = (state=initialstate, action) => {
  let newState;
  switch(action.type){

    case 'auth':
      newState= {...state, ...action.payload}
      window.location.href = '/articles'
      console.log('new', newState)
      return newState

    case 'logout':
      newState = {...state, token: null, username: null, email:null}
      window.sessionStorage.removeItem('token')
      window.sessionStorage.removeItem('username')
      window.location.href='/'
      return newState

    case 'newArticle':
      console.log('payload', action.payload)
      newState = {...state, new: action.payload}
      return newState

    case 'getArticles':
      newState = {...state, articles: action.payload}
      // console.log(state)
      return newState
    
    case 'getArticle':
      console.log('payload', action.payload)
      newState = {...state, article: action.payload[0]}
      // console.log(newState)
      return newState

    case 'selectArticle':
      console.log('payload', action.payload)
      newState = {...state, edit: action.payload}
      return newState

    case 'getUsers':
      newState = {...state, users: action.payload}
      // console.log(state)
      return newState

    case 'getUser':
      console.log('payload', action.payload)
      newState = {...state, user: action.payload[0]}
      // console.log(newState)
      return newState

    case 'getCategories':
      newState = {...state, categories: action.payload}
      // console.log(state)
      return newState

    case 'getCategory':
      newState = {...state, category: action.payload}
      // console.log(state)
      return newState

    default:
      return state
  }

}

/////////////////////////
// AppContext
/////////////////////////
const AppContext = React.createContext(null)

export const AppState = (props) => {

  const [state, dispatch] = useReducer(reducer, initialstate)


  return <AppContext.Provider value={{state, dispatch}} > {props.children} </AppContext.Provider>

};

//////////////////////////
// useAppState hook
//////////////////////////

export const useAppState = () => {
  return useContext(AppContext)
}

