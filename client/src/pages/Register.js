import React,{useState,useEffect} from 'react';
import {Button, Form, Input, message} from 'antd';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios'
import Loading from '../components/Loading';
import { BankOutlined } from '@ant-design/icons';

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate =useNavigate();
  const submitHandler = async (values) => {
    console.log('aa',values);
    try {
      setLoading(true)
      await axios.post('http://localhost:8080/api/v1/users/register',values)      
      message.success('Register successfull')
      setLoading(false)
      navigate('/login')
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
      <Form layout="vertical" onFinish={(e) =>submitHandler(e)} className="form-wrapper" style={{
        maxWidth: 400,
        minWidth:350
      }}>
       <h1 style={{textAlign:"center"}}><BankOutlined /></h1>
        <h4>Expanse-Management-System</h4>
        <Form.Item label="Name" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input type="email" />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input type="password" />
        </Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Register
        </Button>
        {/* <button type='submit' className='btn btn-primary'>Register</button> */}
        <div className="d-flex">
          <Link to="/login">Already Register ? Click here to login</Link>
          
        </div>
      </Form>
    </div>
  );
};

export default Register;
