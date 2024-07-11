'use client';

import React, { useEffect, useState } from 'react';
import { Space, Row } from 'antd';
import dynamic from 'next/dynamic';

const HomePengumuman = dynamic(() => import('./HomePengumuman'), { ssr: false });

const Home = () => {


  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Row justify="end">
        <HomePengumuman />
      </Row>
    </Space>
  );
}

export default Home;