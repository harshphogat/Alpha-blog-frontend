import { Link } from 'react-router-dom';


export default function Jumbotron() {
  return (
      <div className='container' id='home-container'>
        <div className='jumbotron p-5 mb-4 bg-light rounded-3 text-center'>
          <div className='container-fluid py-5'> 
            <h1 className='display-5 fw-bold'>Alpha Blog</h1>
            <p className='fs-4'>
              Project application from the learning course. This applciation is a blogging platform which can be used by anyone to share their thoughts about certain topics.
            </p>
            <Link to="/signup" className='btn btn-lg btn-success'>Sign Up!</Link>
          </div>
        </div>
      </div>
  )
}