'use client';

import React, { useEffect, useState } from 'react';
import { getCollection } from '../../utils/firebase';
import { Table, Button, Space } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import RoleMappings from '@/app/utils/reference/roles';
import dynamic from 'next/dynamic';

const ModalEditUser = dynamic(() => import('./ModalEditUser'), { ssr: false });

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [openEditUser, setOpenEditUser] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [loadingUsers, setLoadingUsers] = useState(false);

  const columns = [
    // {
    //   title: 'ID',
    //   dataIndex: 'id',
    //   key: 'id',
    // },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone_number',
      key: 'phone_number',
    },
    {
      title: 'NIP',
      dataIndex: 'nip',
      key: 'nip',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role) => RoleMappings[role],
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button
          icon={<EditOutlined />}
          type="primary"
          onClick={() => {
            setSelectedUser(record);
            setOpenEditUser(true);
          }}
        />
      ),
    },
  ];

  const getData = async () => {
    setLoadingUsers(true);
    try {
      const usersData = await getCollection("users");
      setUsers(usersData);
    } catch (error) {
      console.error(error);
    }
    setLoadingUsers(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Table
        size='small'
        columns={columns}
        dataSource={users}
        rowKey="id"
        pagination={{ pageSize: 20, showQuickJumper: true, showSizeChanger: true }}
        loading={loadingUsers}
      />
      <ModalEditUser
        open={openEditUser}
        setOpen={setOpenEditUser}
        user={selectedUser}
        setUsers={setUsers}
      />
    </Space>
  );
}

export default UserManagement;