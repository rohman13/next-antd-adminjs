// src/app/UserProfile.js
// Desc: User profile component for the main layout

'use client';

import React, { useState } from 'react';
import { Button, Popover, Avatar } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { signOut } from 'firebase/auth';
import { auth } from '@/app/utils/firebase';

const UserProfile = ({ email }) => {
  const [visible, setVisible] = useState(false);

  const handleVisibleChange = (visible) => {
    setVisible(visible);
  };

  const content = (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      {/* <Avatar style={{ backgroundColor: '#87d068', marginBottom: '8px' }} icon={<UserOutlined />} /> */}
      <p>{email}</p>
      <Button
        type="text"
        icon={<LogoutOutlined />}
        onClick={() => {
          signOut(auth).then(() => {
            console.log('logout');
            window.location.replace('/');
          });
        }}
        style={{ marginTop: '8px' }}
      >
        Logout
      </Button>
    </div>
  );

  return (
    <Popover
      content={content}
      trigger="click"
      open={visible}
      onOpenChange={handleVisibleChange}
    >
      <Button type="primary" shape="circle" icon={<UserOutlined />} />
    </Popover>
  );
};

export default UserProfile;
