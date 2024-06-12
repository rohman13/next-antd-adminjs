// src/app/ClientLayout.js
'use client';

import React from 'react';
import { Layout, Menu, theme } from 'antd';
import { UserOutlined, VideoCameraOutlined, UploadOutlined } from '@ant-design/icons';
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { menuList } from './Menu';

const { Header, Content, Footer, Sider } = Layout;

const ClientLayout = ({ children }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleBreakpoint = (broken) => {
    console.log(broken);
  };

  const handleCollapse = (collapsed, type) => {
    console.log(collapsed, type);
  };

  return (
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={handleBreakpoint}
        onCollapse={handleCollapse}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['4']}
          items={menuList}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
        <Content
          style={{
            margin: '24px 16px 0',
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <AntdRegistry>{children}</AntdRegistry>
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          AntBlank ©{new Date().getFullYear()} Created by rohman13
        </Footer>
      </Layout>
    </Layout>
  );
};

export default ClientLayout;
