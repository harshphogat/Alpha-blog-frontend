import './index.css'
import 'bootstrap/dist/js/bootstrap'
import Home from './pages/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Auth from './pages/Auth.jsx'
import Signup from './pages/SignUp'
import Article from './pages/Article'
import CreateArticle from './components/CreateArticle'
import EditArticle from './components/EditArticle'
import Category from './pages/Category'
import ShowArticle from './components/ShowArticle'
import User from './pages/User'
import EditUser from './components/EditUser'
import ShowUser from './components/ShowUser'
import ShowCategory from './components/ShowCategory'

function App() {
  
  const valid = sessionStorage.token
  
  return (
    <>
      <BrowserRouter>
        <Navbar valid={valid} />
        <Routes>
          <Route path ="/" element = { <Home /> } />
          <Route path ="/articles/new" element = {<CreateArticle />} />
          <Route path ="/articles/:id/edit" element = {<EditArticle />} />
          <Route path ="/articles/:id" element = {<ShowArticle />} />
          <Route path ="/login" element = {<Auth />} />
          <Route path ="/signup" element = {<Signup />} />
          <Route path ='/articles' element={<Article />} />
          <Route path ='/users' element={<User />} />
          <Route path ="/users/:id/edit" element = {<EditUser />} />
          <Route path ="/users/:id" element = {<ShowUser />} />
          <Route path ='/categories' element={<Category />} />
          <Route path ="/categories/:id" element = {<ShowCategory />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
