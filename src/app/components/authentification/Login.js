'use client';

import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Checkbox, Layout, Row, Card } from 'antd';
import Registration from './Registration';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/app/utils/firebase';

const Login = ({ isLoading }) => {
  const [registerClicked, setRegisterClicked] = useState(false);
  const [loadingLogin, setLoadingLogin] = useState(false);

  const onFinish = async (values) => {
    setLoadingLogin(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
      const user = userCredential.user;
      console.log(user);
      // redirect to /home
      if (user) window.location.replace('/home');
    } catch (error) {
      console.error(error);
    }
    setLoadingLogin(false);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Card
        title="Login"
        style={{ width: 400, margin: 'auto', marginTop: '10%' }}
        extra={
          <Row>
            <Button
              type="link"
              onClick={() => setRegisterClicked(!registerClicked)}
            >
              {registerClicked ? 'Back to Login' : 'Register'}
            </Button>
          </Row>
        }
      >
        {registerClicked && <Registration />}
        <br />
        {!registerClicked && (
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            layout="vertical"
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Please input your email!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loadingLogin || isLoading}>
                Login
              </Button>
            </Form.Item>
          </Form>
        )}
      </Card>
    </Layout>
  );
}

export default Login;
