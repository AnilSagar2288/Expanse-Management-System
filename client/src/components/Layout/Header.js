import React, {useState, useEffect} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {message} from 'antd';


const Header = () => {
  const navigate =useNavigate();
  const [userLogin, setUserLogin] = useState('')
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem('user'))
    if(user){
      setUserLogin(user)
    }
  },[])


  const logoutHandler = () =>{
    localStorage.removeItem('user')
    navigate('/login')
    message.success('Logout successfull')
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to='/'>Expanse Management System</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to='/'>
                {userLogin && userLogin.name}
              </Link>
            </li>
            <li className="nav-item">
              <button className="btn btn-primary" onClick={logoutHandler}>Logout</button>
            </li>            
          </ul>
        </div>
      </div>
    </nav>

    </>

  )
}

export default Header
