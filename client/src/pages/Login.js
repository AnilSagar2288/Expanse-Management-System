import React,{useState,useEffect} from 'react';
import {Button, Form, Input, message} from 'antd';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios'
import Loading from '../components/Loading';
import {BankOutlined} from '@ant-design/icons'

const Login = () => {
  const navigate =useNavigate();
  const [loading, setLoading] = useState(false);
  const submitHandler = async (values) => {
    try {
      setLoading(true)
      const {data} = await axios.post('http://localhost:8080/api/v1/users/login',values)      
      message.success('Login successfull')
      localStorage.setItem('user', JSON.stringify({...data.user, password:''}));
      navigate('/');
      setLoading(false)
    } catch (error) {
      setLoading(false)
      message.error('Something went wrong')
    }
      
  };
  useEffect(()=>{
    if(localStorage.getItem('user')){
      navigate('/')
    }
  },[navigate])
  return (
    <div className="register-page">
      
      {loading && <Loading />}
      <Form layout="vertical" onFinish={submitHandler} className="form-wrapper" style={{
        maxWidth: 400,
        minWidth:350
      }}>
        <h1 style={{textAlign:"center"}}><BankOutlined /></h1>
        <h4>Expanse-Management-System</h4>
        <Form.Item label="Email" name="email">
          <Input type="email" />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input type="password" />
        </Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Login
        </Button>
        <div className="d-flex mt-3">
          <Link to="/register">Not a user ? Click here to Register</Link>
        </div>
      </Form>
    </div>
  )
}

export default Login