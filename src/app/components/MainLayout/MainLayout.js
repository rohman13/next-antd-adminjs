// src/app/MainLayout.js
'use client';

import React, { createContext, useEffect, useState } from 'react';
import { Layout, Image, theme, ConfigProvider, Form } from 'antd';
import { AntdRegistry } from "@ant-design/nextjs-registry";
import MenuItems from './MenuItems';
import UserProfile from './UserProfile';
import UserContext from '../Context/UserContext';

const { Header, Content, Footer, Sider } = Layout;

const MainLayout = ({ children, session }) => {
  const [user, setUser] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isBroken, setIsBroken] = useState(false);

  useEffect(() => {
    // if (session) {
    //   setUser(session);
    // }
  }, []);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleBreakpoint = (broken) => {
    if (broken) {
      setIsCollapsed(true);
      setIsBroken(true);
    } else {
      setIsCollapsed(false);
      setIsBroken(false);
    }
  };

  const handleCollapse = (collapsed, type) => {
    console.log("collapsed", collapsed, type);
    setIsCollapsed(collapsed);
  };

  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={handleBreakpoint}
        onCollapse={handleCollapse}
        theme='light'
      >
        {/* logo here */}
        <div
          style={{
            margin: '6px',
          }}
        >
          <Image
            alt="Logo DJP"
            src="/media/img/logodjp.png"
            preview={false}
            style={{ padding: '4px', maxHeight: '50px' }}
          />
        </div>
        {/* end logo */}
        <MenuItems />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 16,
            background: colorBgContainer,
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
          <UserProfile
            email={session?.email}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px 0',
            minWidth: 340
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
            <AntdRegistry>
              <ConfigProvider
                // componentSize='small'
                theme={{
                  components: {
                    Form: {
                      itemMarginBottom: '8px',
                      verticalLabelPadding: '0 0 2px',
                    },
                  },
                }}
              >
                <UserContext.Provider value={{ user: session }}>
                  {children}
                </UserContext.Provider>
              </ConfigProvider>
            </AntdRegistry>
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
            minWidth: 340
          }}
        >
          AntBlank ©{new Date().getFullYear()} Created by rohman13
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
