'use client';

import React, { useEffect, useState } from 'react';
import { getCollection, getCollectionWithConditions } from '../utils/firebase';
import { Button, Space, Typography, List, Card, message } from 'antd';
import { EditOutlined, SearchOutlined } from '@ant-design/icons';
import ModalPreviewPengumuman from '../components/reusable/ModalPreviewPengumuman';
import dayjs from 'dayjs';
import { Timestamp } from 'firebase/firestore';

const { Link } = Typography;

const HomePengumuman = () => {
  const [pengumuman, setPengumuman] = useState([]);
  const [selectedPengumuman, setSelectedPengumuman] = useState({});
  const [openPreviewPengumuman, setOpenPreviewPengumuman] = useState(false);
  const [loadingPengumuman, setLoadingPengumuman] = useState(false);

  const renderList = (item) => {
    return (
      <List.Item>
        <List.Item.Meta
          title={<div style={{ fontSize: 24 }}>{item.judul}</div>}
          description={<Link href={
            item.url_dokumen ? item.url_dokumen : null
          }>{item.url_dokumen}</Link>}
        />
        <Button
          icon={<SearchOutlined />}
          type="primary"
          onClick={() => {
            setSelectedPengumuman(item);
            setOpenPreviewPengumuman(true);
          }}
        />
      </List.Item>
    )
  }

  const getData = async () => {
    setLoadingPengumuman(true);
    try {
      // const pengumumanData = await getCollectionWithFields("pengumuman", ["judul", "url_dokumen"])
      

      // get all pengumuman with condition expired_date > now
      const conditions = [
        {
          field: "expired_date",
          operator: ">",
          value: Timestamp.now()
        }
      ];
      const pengumumanData = await getCollectionWithConditions("pengumuman", conditions);

      setPengumuman(pengumumanData);
      console.log(pengumumanData);
    } catch (error) {
      message.error(error.message);
    }
    setLoadingPengumuman(false);
  };

  useEffect(() => {
    getData();
  }, []);


  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Card
        title={<div style={{ fontSize: 20 }}>Pengumuman</div>}
      >
        <List
          itemLayout='horizontal'
          dataSource={pengumuman}
          renderItem={renderList}
        />
      </Card>
      <ModalPreviewPengumuman
        open={openPreviewPengumuman}
        setOpen={setOpenPreviewPengumuman}
        pengumuman={selectedPengumuman}
      />
    </Space>
  );
}

export default HomePengumuman;