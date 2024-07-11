'use client';

import React, { useEffect, useState } from 'react';
import { getCollectionWithFields } from '../../utils/firebase';
import { Table, Button, Space, Row, message, Tag } from 'antd';
import { EditOutlined, SearchOutlined } from '@ant-design/icons';
import dynamic from 'next/dynamic';
import dayjs from 'dayjs';

const ModalPengumuman = dynamic(() => import('./ModalPengumuman'), { ssr: false });
const ModalPreviewPengumuman = dynamic(() => import('../../components/reusable/ModalPreviewPengumuman'), { ssr: false });

const SettingPengumuman = () => {
  const [pengumuman, setPengumuman] = useState([]);
  const [selectedPengumuman, setSelectedPengumuman] = useState({});
  const [openModalPengumuman, setOpenModalPengumuman] = useState(false);
  const [openPreviewPengumuman, setOpenPreviewPengumuman] = useState(false);
  const [loadingPengumuman, setLoadingPengumuman] = useState(false);

  const columns = [
    {
      title: 'Judul',
      dataIndex: 'judul',
      key: 'judul',
      sorter: (a, b) => a.judul.localeCompare(b.judul),
    },
    {
      title: 'URL Dokumen',
      dataIndex: 'url_dokumen',
      key: 'url_dokumen',
      sorter: (a, b) => {
        if (a.url_dokumen === null &&
          b.url_dokumen === null) {
          return 0;
        }
        if (a.url_dokumen === null) {
          return -1;
        }
        if (b.url_dokumen === null) {
          return 1;
        }
        return a.url_dokumen.localeCompare(b.url_dokumen);
      },
    },
    {
      title: 'Expired Date',
      dataIndex: 'expired_date',
      key: 'expired_date',
      // render firestore timestamp format to "DD/MM/YYYY"
      render: (expired_date) => {
        const isExpired = dayjs(expired_date.toDate()).isBefore(dayjs());
        return (
          <Tag color={isExpired ? 'red' : 'green'}>
            {dayjs(expired_date.toDate()).format('DD/MM/YYYY')}
          </Tag>
        )
      },
      sorter: (a, b) => a.expired_date.toDate() - b.expired_date.toDate(),
    },
    {
      title: 'Action',
      key: 'action',
      width: 100,
      render: (_, record) => (
        <Row justify="space-around">
          <Button
            icon={<EditOutlined />}
            type="primary"
            onClick={() => {
              setSelectedPengumuman(record);
              setOpenModalPengumuman(true);
            }}
          />
          <Button
            icon={<SearchOutlined />}
            type="primary"
            onClick={() => {
              setSelectedPengumuman(record);
              setOpenPreviewPengumuman(true);
            }}
          />
        </Row>
      ),
    },
  ];

  const getData = async () => {
    setLoadingPengumuman(true);
    try {
      const pengumumanData = await getCollectionWithFields("pengumuman", ["judul", "url_dokumen", "expired_date"])
      setPengumuman(pengumumanData);
    } catch (error) {
      message.error(error.message);
    }
    setLoadingPengumuman(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleAddPengumuman = async (values) => {
    setSelectedPengumuman({});
    setOpenModalPengumuman(true);
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Row justify="end">
        <Button type="primary" onClick={handleAddPengumuman}>
          Tambah Pengumuman
        </Button>
      </Row>
      <Row justify="center">
        <Table
          size='small'
          columns={columns}
          dataSource={pengumuman}
          rowKey="docName"
          pagination={{ pageSize: 20, showQuickJumper: true, showSizeChanger: true }}
          style={{ width: '100%' }}
          loading={loadingPengumuman}
          showSorterTooltip={{
            title: 'Urutkan',
            placement: 'bottomRight',
          }}
        />
      </Row>
      <ModalPengumuman
        open={openModalPengumuman}
        setOpen={setOpenModalPengumuman}
        pengumuman={selectedPengumuman}
        setPengumuman={setPengumuman}
      />
      <ModalPreviewPengumuman
        open={openPreviewPengumuman}
        setOpen={setOpenPreviewPengumuman}
        pengumuman={selectedPengumuman}
      />
    </Space>
  );
}

export default SettingPengumuman;