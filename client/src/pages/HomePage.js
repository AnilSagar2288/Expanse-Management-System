import React, {useState, useEffect} from 'react';
import {Form, Input, message, Modal, Select, Table, DatePicker} from 'antd';
import Layout from '../components/Layout/Layout';
import {
  UnorderedListOutlined,
  AreaChartOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import axios from 'axios';
import Loading from '../components/Loading';
import moment from 'moment';
import Analytics from '../components/Analytics';
const {RangePicker} = DatePicker;

const HomePage = () => {
  const [loading, setLoading] = useState (false);
  const [form] = Form.useForm ();
  const [showModel, setShowModal] = useState (false);
  const [allTarnsaction, setAllTransaction] = useState ([]);
  const [frequency, setFrequency] = useState ('7');
  const [selectedDate, setSelectedDate] = useState ([]);
  const [type, setType] = useState ('all');
  const [viewData, setViewData] = useState ('table');
  const [editable, setEditable] = useState (null);

  useEffect (
    () => {
      //Get Taransaction Data
      const getAllTransactionData = async () => {
        try {
          const user = JSON.parse (localStorage.getItem ('user'));
          setLoading (true);
          const {
            data,
          } = await axios.post (
            'http://localhost:8080/api/v1/transactions/get-transaction',
            {userid: user._id, frequency, selectedDate, type}
          );
          setLoading (false);
          setAllTransaction (data);
          console.log (data);
        } catch (error) {
          setLoading (false);
          message.error ('Failed to get transaction');
        }
      };

      getAllTransactionData ();
    },
    [frequency, selectedDate, type]
  );

  //Create frontend table
  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: text => <span>{moment (text).format ('YYYY-MM-DD')}</span>,
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'reference',
      dataIndex: 'reference',
      key: 'reference',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <div>
          <EditOutlined
            onClick={() => {
              setEditable (record);
              setShowModal (true);
            }}
          />
          <DeleteOutlined className="mx-2" onClick={() => {handleDelete(record)}} />
        </div>
      ),
    },
  ];

  //Add Transaction Data
  const handleDelete = async (record) =>{
    try {
      setLoading (true);
      await axios.post('http://localhost:8080/api/v1/transactions/delete-transaction',{transactionId:record._id})
      setLoading (false);
      message.success ('Transactions deleted Successfully');
    } catch (error) {
      setLoading (false);
      message.error ('Unable to delete Transaction');
    }
  }

  //Add Transaction Data
  const handleSubmit = async values => {
    const {amount, type, category, date} = values;
    if (amount && type && date && category) {
      try {
        const user = JSON.parse (localStorage.getItem ('user'));
        setLoading (true);
        if (editable) {
          await axios.post (
            'http://localhost:8080/api/v1/transactions/edit-transaction',
            {
              payload: {
                ...values, userid: user._id
              }, 
              trasactionId: editable._id
            }
          );
          setLoading (false);
          message.success ('Transactions Updated Successfully');
        } else {
          await axios.post (
            'http://localhost:8080/api/v1/transactions/add-transaction',
            {...values, userid: user._id}
          );
          setLoading (false);
          message.success ('Transactions add Successfully');
        }
        setShowModal (false);
        setEditable (null);
      } catch (error) {
        setLoading (false);
        message.error ('Failed to add transaction');
      }
    } else {
      message.error ('Please Select All mendatory fields');
    }
  };

  const addTransactionHandler = () => {
    setShowModal (true);
    form.resetFields ();
  };

  return (
    <Layout>
      {loading && <Loading />}
      <div className="filters">
        <div>
          <h6>Select Frequency</h6>
          <Select
            value={frequency}
            onChange={values => setFrequency (values)}
            style={{width: '200px'}}
          >
            <Select.Option value="7">Last 1 week</Select.Option>
            <Select.Option value="30">Last 1 month</Select.Option>
            <Select.Option value="365">Last 1 year</Select.Option>
            <Select.Option value="custom">Last 1 Custom</Select.Option>
          </Select>
          {frequency === 'custom' &&
            <RangePicker
              value={selectedDate}
              onChange={values => setSelectedDate (values)}
            />}
        </div>
        <div>
          <h6>Select Type</h6>
          <Select
            value={type}
            onChange={values => setType (values)}
            style={{width: '200px'}}
          >
            <Select.Option value="all">All</Select.Option>
            <Select.Option value="income">Income</Select.Option>
            <Select.Option value="expense">Expense</Select.Option>
          </Select>
          {frequency === 'custom' &&
            <RangePicker
              value={selectedDate}
              onChange={values => setSelectedDate (values)}
            />}
        </div>

        <div className="switch-icon">
          <UnorderedListOutlined
            className={`mx-2 ${viewData === 'table' ? 'active-icon' : 'inactive-icon'}`}
            onClick={() => setViewData ('table')}
          />
          <AreaChartOutlined
            className={`mx-2 ${viewData === 'analylitcs' ? 'active-icon' : 'inactive-icon'}`}
            onClick={() => setViewData ('analylitcs')}
          />
        </div>
        <div>
          <button className="btn btn-primary" onClick={addTransactionHandler}>
            Add New
          </button>
        </div>
      </div>
      <div className="content">
        {viewData === 'table'
          ? <Table columns={columns} dataSource={allTarnsaction} />
          : <Analytics allTarnsaction={allTarnsaction} />}

      </div>

      <Modal
        title={editable ? 'Edit Transaction' : 'Add transaction'}
        open={showModel}
        onCancel={() => setShowModal (false)}
        footer={false}
      >
        <Form
          layout="vertical"
          onFinish={handleSubmit}
          form={form}
          initialValues={editable}
        >
          <Form.Item label="Amount" name="amount">
            <Input type="text" />
          </Form.Item>
          <Form.Item label="Type" name="type">
            <Select>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Category" name="category">
            <Select>
              <Select.Option value="salary">Salary</Select.Option>
              <Select.Option value="tip">Tip</Select.Option>
              <Select.Option value="project">Porject</Select.Option>
              <Select.Option value="food">Food</Select.Option>
              <Select.Option value="movie">Movie</Select.Option>
              <Select.Option value="bills">Bills</Select.Option>
              <Select.Option value="medical">Medical</Select.Option>
              <Select.Option value="fee">Fee</Select.Option>
              <Select.Option value="tax">Tax</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Date" name="date">
            <Input type="date" />
          </Form.Item>
          <Form.Item label="Reference" name="reference">
            <Input type="text" />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input type="text" />
          </Form.Item>
          <div className="d-flex">
            <button type="submit" className="btn btn-primary login-form-button">
              Save
            </button>
          </div>
        </Form>
      </Modal>
    </Layout>
  );
};

export default HomePage;
